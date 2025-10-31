import { publicClient } from '../config/client.js';
import { UNISWAP_V3_ADDRESSES, AERODROME_ADDRESSES } from '../constants/contracts.js';
import { UNISWAP_V3_FACTORY_ABI, AERODROME_FACTORY_ABI, UNISWAP_V2_FACTORY_ABI, UNISWAP_V4_FACTORY_ABI, ERC20_ABI } from '../constants/abis.js';
import { saveToken, getAllTokenAddresses, updateDiscoveryProgress, getDiscoveryProgress, acquireDiscoveryLock, releaseDiscoveryLock, getDiscoveryState, setDiscoveryState } from '../db/kv.js';
import type { DiscoveredToken } from '../types/index.js';
import { getAddress } from 'viem';
import { withRetry, withTimeout, sleep } from '../utils/retry.js';

/**
 * Token Discovery Service
 * 
 * Scans DEX factory events to discover new ERC-20 tokens on Base network.
 */

interface FactoryConfig {
  address: `0x${string}`;
  abi: typeof UNISWAP_V3_FACTORY_ABI | typeof AERODROME_FACTORY_ABI | typeof UNISWAP_V2_FACTORY_ABI | typeof UNISWAP_V4_FACTORY_ABI;
  eventName: string;
  source: 'uniswap-v2' | 'uniswap-v3' | 'uniswap-v4' | 'aerodrome';
}

const FACTORY_CONFIGS: FactoryConfig[] = [
  {
    address: UNISWAP_V3_ADDRESSES.FACTORY as `0x${string}`,
    abi: UNISWAP_V3_FACTORY_ABI,
    eventName: 'PoolCreated',
    source: 'uniswap-v3',
  },
  {
    address: AERODROME_ADDRESSES.FACTORY as `0x${string}`,
    abi: AERODROME_FACTORY_ABI,
    eventName: 'PairCreated',
    source: 'aerodrome',
  },
];

// Optionally include Uniswap V2 and V4 if configured via env
try {
  const v2Factory = process.env.UNISWAP_V2_FACTORY as `0x${string}` | undefined;
  if (v2Factory) {
    FACTORY_CONFIGS.push({
      address: v2Factory,
      abi: UNISWAP_V2_FACTORY_ABI,
      eventName: 'PairCreated',
      source: 'uniswap-v2',
    });
  }
  const v4Factory = process.env.UNISWAP_V4_FACTORY as `0x${string}` | undefined;
  if (v4Factory) {
    FACTORY_CONFIGS.push({
      address: v4Factory,
      abi: UNISWAP_V4_FACTORY_ABI,
      eventName: 'PoolCreated',
      source: 'uniswap-v4',
    });
  }
} catch {}

/**
 * Scan factory events in a block range
 */
export async function scanFactoryEvents(
  factoryAddress: `0x${string}`,
  fromBlock: bigint,
  toBlock: bigint,
  abi: FactoryConfig['abi'],
  eventName: string
): Promise<any[]> {
  try {
    const logs = await withRetry(() => publicClient.getLogs({
      address: factoryAddress,
      event: {
        type: 'event',
        name: eventName,
        inputs: abi[0].inputs,
      } as any,
      fromBlock,
      toBlock,
    }));

    console.log(`Found ${logs.length} ${eventName} events between blocks ${fromBlock} and ${toBlock}`);
    return logs;
  } catch (error) {
    console.error(`Error scanning factory events for ${eventName}:`, error);
    return [];
  }
}

/**
 * Extract token addresses from factory event logs
 */
export function extractTokensFromLogs(logs: any[]): string[] {
  const tokens = new Set<string>();

  for (const log of logs) {
    const args = log.args as any;
    
    // Handle different event formats
    if (args.token0 && args.token1) {
      tokens.add(getAddress(args.token0));
      tokens.add(getAddress(args.token1));
    }
  }

  return Array.from(tokens);
}

/**
 * Validate if an address is a compliant ERC-20 token
 */
export async function validateERC20(tokenAddress: string): Promise<{
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
} | null> {
  try {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      withRetry(() => (publicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'name',
      })),
      withRetry(() => (publicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'symbol',
      })),
      withRetry(() => (publicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'decimals',
      })),
      withRetry(() => (publicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'totalSupply',
      })),
    ]);

    return {
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
      totalSupply: (totalSupply as any)?.toString?.() ?? String(totalSupply as any),
    };
  } catch (error) {
    console.error(`Error validating ERC-20 token ${tokenAddress}:`, error);
    return null;
  }
}

/**
 * Get deployer address for a token contract
 * Note: Finding the deployer requires scanning contract creation transactions which is complex
 * For now, we return a placeholder since deployer info isn't critical for discovery
 */
export async function getTokenDeployer(_tokenAddress: string): Promise<string> {
  // TODO: Implement proper deployer detection by scanning ContractCreation events
  // For now, return placeholder to avoid expensive RPC calls
  return '0x0000000000000000000000000000000000000000';
}

/**
 * Get block number and timestamp from a block
 */
async function getBlockInfo(blockNumber: bigint): Promise<{ number: number; timestamp: number }> {
  try {
    const block = await withRetry(() => publicClient.getBlock({ blockNumber }));
    return {
      number: Number(block.number),
      timestamp: Number(block.timestamp),
    };
  } catch (error) {
    console.error(`Error getting block ${blockNumber}:`, error);
    throw error;
  }
}

/**
 * Discover new tokens from factory events
 */
export async function discoverNewTokens(blocksToScan: number = 100000): Promise<number> {
  console.log(`Starting token discovery`);

  const BATCH_SIZE = Number(process.env.DISCOVERY_BATCH_SIZE || 1000);
  const BATCH_TIMEOUT_MS = Number(process.env.DISCOVERY_BATCH_TIMEOUT_MS || 15000);
  const SLEEP_MS = Number(process.env.DISCOVERY_SLEEP_MS || 400);

  let tokensDiscoveredInBatch = 0;

  const lockTtl = 90; // 60–120s window
  const gotLock = await acquireDiscoveryLock(lockTtl);
  if (!gotLock) {
    console.log('Discovery already running (lock present). Exiting.');
    return 0;
  }

  try {
    const latestBlock = await withRetry(() => publicClient.getBlockNumber());

    // Determine starting block
    const state = await getDiscoveryState();
    const fallbackFrom = latestBlock - BigInt(Math.min(blocksToScan, BATCH_SIZE));
    const fromBlock = state ? BigInt(state.blockNumber + 1) : fallbackFrom;
    const toBlock = fromBlock + BigInt(BATCH_SIZE - 1) > latestBlock ? latestBlock : fromBlock + BigInt(BATCH_SIZE - 1);

    console.log(`Scanning blocks ${fromBlock} → ${toBlock} (latest ${latestBlock})`);

    const existingTokens = new Set(await getAllTokenAddresses());
    const discoveredTokens: DiscoveredToken[] = [];

    const startTime = Date.now();
    await withTimeout(
      (async () => {
        for (const config of FACTORY_CONFIGS) {
          const logs = await scanFactoryEvents(
            config.address,
            fromBlock,
            toBlock,
            config.abi,
            config.eventName
          );

          const tokenAddresses = extractTokensFromLogs(logs);
          for (const address of tokenAddresses) {
            const lowerAddress = address.toLowerCase();
            if (existingTokens.has(lowerAddress)) continue;

            const validation = await validateERC20(address);
            if (!validation) continue;

            const deployer = await getTokenDeployer(address);
            const firstLog = logs[0];
            const blockInfo = firstLog
              ? await getBlockInfo(firstLog.blockNumber)
              : { number: Number(toBlock), timestamp: Math.floor(Date.now() / 1000) };

            const token: DiscoveredToken = {
              address: lowerAddress,
              name: validation.name,
              symbol: validation.symbol,
              decimals: validation.decimals,
              totalSupply: validation.totalSupply,
              deployer,
              createdAtBlock: blockInfo.number,
              createdAtTimestamp: blockInfo.timestamp,
              discoveredFrom: config.source as any,
              lastUpdated: Date.now(),
            };

            discoveredTokens.push(token);
            existingTokens.add(lowerAddress);
          }
        }
      })(),
      BATCH_TIMEOUT_MS,
      'discovery batch'
    );

    // Persist discovered tokens
    for (const token of discoveredTokens) {
      await saveToken(token);
    }

    tokensDiscoveredInBatch = discoveredTokens.length;

    // Update progress state keys
    const totalTokensCount = (await getAllTokenAddresses()).length;
    const durationMs = Date.now() - startTime;
    await updateDiscoveryProgress(Number(toBlock), totalTokensCount);
    await setDiscoveryState({
      blockNumber: Number(toBlock),
      timestamp: Date.now(),
      totalTokens: totalTokensCount,
      lastBatchDurationMs: durationMs,
    });

    // Sleep to respect limits
    await sleep(SLEEP_MS);

    console.log(`Discovery batch complete. Found ${tokensDiscoveredInBatch} new tokens.`);
    return tokensDiscoveredInBatch;
  } catch (error) {
    console.error('Error during token discovery:', error);
    throw error;
  } finally {
    await releaseDiscoveryLock();
  }
}

/**
 * Get the last scanned block from progress
 */
export async function getLastScannedBlock(): Promise<number> {
  const state = await getDiscoveryState();
  if (state?.blockNumber) return state.blockNumber;
  const progress = await getDiscoveryProgress();
  return progress?.lastScannedBlock || 0;
}

/**
 * Scan only new blocks since last discovery
 */
export async function discoverNewTokensIncremental(blocksToScan: number = 1000): Promise<number> {
  // For serverless safety, run a single batch and rely on KV state to continue next run
  return discoverNewTokens(blocksToScan);
}

