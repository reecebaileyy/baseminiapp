import { publicClient } from '../config/client.js';
import { UNISWAP_V3_ADDRESSES, AERODROME_ADDRESSES } from '../constants/contracts.js';
import { UNISWAP_V3_FACTORY_ABI, AERODROME_FACTORY_ABI, ERC20_ABI } from '../constants/abis.js';
import { saveToken, getAllTokenAddresses, updateDiscoveryProgress, getDiscoveryProgress } from '../db/kv.js';
import type { DiscoveredToken } from '../types/index.js';
import { getAddress, formatUnits } from 'viem';

/**
 * Token Discovery Service
 * 
 * Scans DEX factory events to discover new ERC-20 tokens on Base network.
 */

interface FactoryConfig {
  address: `0x${string}`;
  abi: typeof UNISWAP_V3_FACTORY_ABI | typeof AERODROME_FACTORY_ABI;
  eventName: string;
  source: 'uniswap-v3' | 'aerodrome';
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
    const logs = await publicClient.getLogs({
      address: factoryAddress,
      event: {
        type: 'event',
        name: eventName,
        inputs: abi[0].inputs,
      } as any,
      fromBlock,
      toBlock,
    });

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
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'name',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'decimals',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI as any,
        functionName: 'totalSupply',
      }),
    ]);

    return {
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
      totalSupply: totalSupply.toString(),
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
export async function getTokenDeployer(tokenAddress: string): Promise<string> {
  // TODO: Implement proper deployer detection by scanning ContractCreation events
  // For now, return placeholder to avoid expensive RPC calls
  return '0x0000000000000000000000000000000000000000';
}

/**
 * Get block number and timestamp from a block
 */
async function getBlockInfo(blockNumber: bigint): Promise<{ number: number; timestamp: number }> {
  try {
    const block = await publicClient.getBlock({ blockNumber });
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
  console.log(`Starting token discovery - scanning ${blocksToScan} blocks`);

  try {
    // Get current block
    const currentBlock = await publicClient.getBlockNumber();
    const fromBlock = currentBlock - BigInt(blocksToScan);
    
    console.log(`Scanning from block ${fromBlock} to ${currentBlock}`);

    // Get existing tokens to avoid duplicates
    const existingTokens = new Set(await getAllTokenAddresses());
    const discoveredTokens: DiscoveredToken[] = [];
    let totalNewTokens = 0;

    // Scan each factory
    for (const config of FACTORY_CONFIGS) {
      console.log(`Scanning ${config.source} factory...`);

      // Get logs in batches to avoid hitting RPC limits
      // Use smaller batches for public RPC (some providers have limits)
      const BATCH_SIZE = 10;
      let scanned = 0;

      for (let batchFrom = fromBlock; batchFrom <= currentBlock; batchFrom += BigInt(BATCH_SIZE)) {
        const batchTo = batchFrom + BigInt(BATCH_SIZE) > currentBlock 
          ? currentBlock 
          : batchFrom + BigInt(BATCH_SIZE);

        const logs = await scanFactoryEvents(
          config.address,
          batchFrom,
          batchTo,
          config.abi,
          config.eventName
        );

        const tokenAddresses = extractTokensFromLogs(logs);

        // Filter out existing tokens and validate new ones
        for (const address of tokenAddresses) {
          const lowerAddress = address.toLowerCase();

          if (existingTokens.has(lowerAddress)) {
            console.log(`Token ${address} already exists, skipping`);
            continue;
          }

          // Validate ERC-20 compliance
          const validation = await validateERC20(address);
          if (!validation) {
            console.log(`Token ${address} failed ERC-20 validation, skipping`);
            continue;
          }

          // Get deployer
          const deployer = await getTokenDeployer(address);

          // Get block info from the first log
          const firstLog = logs[0];
          const blockInfo = firstLog
            ? await getBlockInfo(firstLog.blockNumber)
            : { number: Number(currentBlock), timestamp: Math.floor(Date.now() / 1000) };

          const token: DiscoveredToken = {
            address: lowerAddress,
            name: validation.name,
            symbol: validation.symbol,
            decimals: validation.decimals,
            totalSupply: validation.totalSupply,
            deployer: deployer,
            createdAtBlock: blockInfo.number,
            createdAtTimestamp: blockInfo.timestamp,
            discoveredFrom: config.source,
            lastUpdated: Date.now(),
          };

          discoveredTokens.push(token);
          existingTokens.add(lowerAddress);
          totalNewTokens++;

          console.log(`Discovered new token: ${token.symbol} (${token.address}) from ${config.source}`);
        }

        scanned += BATCH_SIZE;
        if (scanned % 100 === 0) {
          console.log(`Scanned ${scanned}/${blocksToScan} blocks...`);
        }
      }
    }

    // Save all discovered tokens
    console.log(`Saving ${discoveredTokens.length} new tokens to KV...`);
    for (const token of discoveredTokens) {
      await saveToken(token);
    }

    // Update progress
    const totalTokens = await getAllTokenAddresses();
    await updateDiscoveryProgress(Number(currentBlock), totalTokens.length);

    console.log(`Token discovery complete. Found ${totalNewTokens} new tokens.`);
    return totalNewTokens;
  } catch (error) {
    console.error('Error during token discovery:', error);
    throw error;
  }
}

/**
 * Get the last scanned block from progress
 */
export async function getLastScannedBlock(): Promise<number> {
  const progress = await getDiscoveryProgress();
  return progress?.lastScannedBlock || 0;
}

/**
 * Scan only new blocks since last discovery
 */
export async function discoverNewTokensIncremental(blocksToScan: number = 1000): Promise<number> {
  const lastScanned = await getLastScannedBlock();
  const currentBlock = await publicClient.getBlockNumber();
  
  if (lastScanned === 0 || Number(currentBlock) - lastScanned > blocksToScan) {
    // Full scan
    return await discoverNewTokens(blocksToScan);
  } else {
    // Incremental scan from lastScanned to current
    const blocksRemaining = Number(currentBlock) - lastScanned;
    console.log(`Incremental scan: ${blocksRemaining} blocks since last scan`);
    
    // Use the existing discoverNewTokens but only process the range
    // For now, just do a full scan - can optimize later
    return await discoverNewTokens(Math.min(blocksToScan, blocksRemaining));
  }
}

