import { serverPublicClient } from '../config/client.js';
import { ERC20_ABI } from '../constants/abis.js';
import type { Token } from '../types';
import { formatUnits } from 'viem';
import { getCachedHolderCount, saveHolderCount, wasHolderCountRecentlyFailed, markHolderCountFailed } from '../db/kv.js';
import { withRetry, withTimeout } from '../utils/retry.js';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

/**
 * Fetch basic token information from contract
 */
export async function getTokenInfo(tokenAddress: string): Promise<Token> {
  try {
    const [name, symbol, decimals] = await Promise.all([
      (serverPublicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'name',
      }),
      (serverPublicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      (serverPublicClient as any).readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    return {
      address: tokenAddress,
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
      chainId: 8453, // Base chain ID
    };
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw new Error(`Failed to fetch token info for ${tokenAddress}`);
  }
}

/**
 * Get token balance for an address
 */
export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string
): Promise<string> {
  try {
    // Handle native ETH (no contract address)
    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
      const balance = await (serverPublicClient as any).getBalance({
        address: walletAddress as `0x${string}`,
      });
      return formatUnits(balance, 18); // ETH has 18 decimals
    }

    // Handle ERC-20 tokens
    const balance = await (serverPublicClient as any).readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as `0x${string}`],
    });

    const token = await getTokenInfo(tokenAddress);
    return formatUnits(balance as bigint, token.decimals);
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return '0';
  }
}

/**
 * Get token holder count using Alchemy API
 * Note: Free tier doesn't support this, returns placeholder
 */
export async function getTokenHolderCount(tokenAddress: string): Promise<number> {
  const addr = tokenAddress.toLowerCase();
  const ttl = Number(process.env.HOLDERCOUNT_TTL_SECS || 1800); // 30m default
  const alchemyHttpUrl = process.env.ALCHEMY_HTTP_URL;
  // Prefer explicit Alchemy HTTP client for logs; fallback to server client
  const logsClient = alchemyHttpUrl
    ? createPublicClient({ chain: base, transport: http(alchemyHttpUrl) })
    : serverPublicClient;
  // If not on Alchemy, many public RPCs restrict getLogs to ~500 blocks
  const isAlchemy = !!alchemyHttpUrl && /alchemy\.com/.test(alchemyHttpUrl);
  const batchSize = Number(process.env.HOLDERCOUNT_BATCH_SIZE || (isAlchemy ? 5000 : 500));
  const rangeBlocks = Number(process.env.HOLDERCOUNT_BLOCK_RANGE || (isAlchemy ? 10000 : 2000));
  try {
    // Check cache first
    const cached = await getCachedHolderCount(addr);
    if (cached !== null) return cached;

    // Avoid repeated heavy scans on recent failures
    if (await wasHolderCountRecentlyFailed(addr)) {
      console.log(`[holders][skip-fail] ${addr}`);
      return 0;
    }

    const latestBlock = await withRetry(() => logsClient.getBlockNumber());
    const startBlock = latestBlock - BigInt(Math.max(rangeBlocks, batchSize)) + BigInt(1);
    const zero = '0x0000000000000000000000000000000000000000';
    const unique = new Set<string>();

    const startTime = Date.now();
    for (let from = startBlock; from <= latestBlock; from += BigInt(batchSize)) {
      const to = from + BigInt(batchSize - 1) > latestBlock ? latestBlock : from + BigInt(batchSize - 1);
      const logs = await withTimeout(
        withRetry(() => logsClient.getLogs({
          address: addr as `0x${string}`,
          event: {
            type: 'event',
            name: 'Transfer',
            inputs: [
              { indexed: true, name: 'from', type: 'address' },
              { indexed: true, name: 'to', type: 'address' },
              { indexed: false, name: 'value', type: 'uint256' },
            ],
          } as any,
          fromBlock: from,
          toBlock: to,
        })),
        15000,
        'holders getLogs batch'
      );

      for (const log of logs) {
        const args = (log as any).args as any;
        const fromAddr = String(args?.from).toLowerCase();
        const toAddr = String(args?.to).toLowerCase();
        if (fromAddr && fromAddr !== zero) unique.add(fromAddr);
        if (toAddr && toAddr !== zero) unique.add(toAddr);
      }

      // Serverless guard
      if (Date.now() - startTime > 45000) {
        console.log(`[holders][timeout-guard] stopping early for ${addr}`);
        break;
      }
    }

    const count = unique.size;
    await saveHolderCount(addr, count, ttl);
    console.log(`[holders][estimate] ${addr} -> ${count} (latency=${Date.now() - startTime}ms)`);
    return count;
  } catch (error) {
    console.error(`[holders][error] ${addr}:`, error);
    await markHolderCountFailed(addr, 300);
    return 0;
  }
}

/**
 * Get token total supply
 */
export async function getTokenTotalSupply(tokenAddress: string): Promise<string> {
  try {
    const totalSupply = await (serverPublicClient as any).readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'totalSupply',
    });

    const token = await getTokenInfo(tokenAddress);
    return formatUnits(totalSupply as bigint, token.decimals);
  } catch (error) {
    console.error('Error fetching total supply:', error);
    return '0';
  }
}

/**
 * Get token metadata including logo
 * Note: This would normally use Alchemy's Enhanced APIs which require Growth plan
 * For now, returns null - metadata should be provided from other sources
 */
export async function getTokenMetadata(_tokenAddress: string) {
  try {
    // Alchemy's token metadata API requires Growth plan on Base chain
    // Returning null for free tier - tokens should provide their own metadata
    return null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

/**
 * Check if address is a contract
 */
export async function isContract(address: string): Promise<boolean> {
  try {
    const code = await (serverPublicClient as any).getBytecode({
      address: address as `0x${string}`,
    });
    return code !== undefined && code !== '0x';
  } catch {
    return false;
  }
}

/**
 * Get multiple token balances for a wallet
 */
export async function getTokenBalances(
  walletAddress: string,
  tokenAddresses: string[]
): Promise<Record<string, string>> {
  try {
    const balances = await Promise.all(
      tokenAddresses.map((tokenAddress) =>
        getTokenBalance(tokenAddress, walletAddress)
      )
    );

    return tokenAddresses.reduce(
      (acc, address, index) => {
        acc[address] = balances[index];
        return acc;
      },
      {} as Record<string, string>
    );
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return {};
  }
}

