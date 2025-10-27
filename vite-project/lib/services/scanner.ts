import { watchPoolCreation, getPoolLiquidity, getTokenPools } from './dex/uniswap-v3';
import { getTokenInfo, getTokenHolderCount, getTokenTotalSupply } from './token';
import { publicClient } from '../config/client';
import type { LiquidityPool, TokenWithMetrics } from '../types';
import { formatUnits } from 'viem';

/**
 * Start watching for new pool creations
 */
export function startPoolScanner(
  onNewPool: (pool: LiquidityPool) => void
): () => void {
  try {
    const unwatch = watchPoolCreation(async (token0, token1, fee, poolAddress) => {
      try {
        // Fetch token information
        const [token0Info, token1Info] = await Promise.all([
          getTokenInfo(token0),
          getTokenInfo(token1),
        ]);

        // Get pool liquidity
        const liquidity = await getPoolLiquidity(poolAddress);

        // Create pool object
        const pool: LiquidityPool = {
          address: poolAddress,
          token0: token0Info,
          token1: token1Info,
          fee,
          liquidity: liquidity.toString(),
          volume24h: 0, // Would need to track swaps to calculate
          dex: 'uniswap-v3',
          createdAt: Date.now(),
        };

        onNewPool(pool);
      } catch (error) {
        console.debug('Error processing new pool:', error);
      }
    });

    return unwatch;
  } catch (error) {
    console.debug('Failed to start pool scanner:', error);
    // Return a no-op unwatch function
    return () => {};
  }
}

/**
 * Get recent pools from blockchain logs
 * Free tier: limited to 10 block range per request
 */
export async function getRecentPools(
  blocksToScan: number = 10 // Free tier limit
): Promise<LiquidityPool[]> {
  try {
    const latestBlock = await publicClient.getBlockNumber();
    const fromBlock = latestBlock - BigInt(blocksToScan);
    
    const logs = await publicClient.getLogs({
      address: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD' as `0x${string}`, // Uniswap V3 Factory
      fromBlock,
      toBlock: latestBlock,
    });

    if (logs.length === 0) {
      console.log('No new pools found in recent blocks');
      return [];
    }

    const pools: LiquidityPool[] = [];

    // Process logs in parallel (limit to prevent rate limiting)
    const batchSize = 5; // Smaller batch size for free tier
    for (let i = 0; i < Math.min(logs.length, 20); i += batchSize) {
      const batch = logs.slice(i, i + batchSize);
      const poolPromises = batch.map(async (log) => {
        try {
          // Parse pool created event (simplified - would need proper event parsing)
          const topics = log.topics;
          if (topics.length < 3 || !topics[1] || !topics[2]) return null;

          const token0 = `0x${topics[1].slice(26)}`;
          const token1 = `0x${topics[2].slice(26)}`;

          const [token0Info, token1Info] = await Promise.all([
            getTokenInfo(token0),
            getTokenInfo(token1),
          ]);

          const pool: LiquidityPool = {
            address: log.address,
            token0: token0Info,
            token1: token1Info,
            fee: 3000, // Would need to parse from log data
            liquidity: '0',
            volume24h: 0,
            dex: 'uniswap-v3' as const,
            createdAt: Date.now(),
          };
          
          return pool;
        } catch {
          return null;
        }
      });

      const batchResults = await Promise.all(poolPromises);
      pools.push(...batchResults.filter((p): p is LiquidityPool => p !== null));
    }

    return pools;
  } catch (error) {
    console.error('Error fetching recent pools:', error);
    return [];
  }
}

/**
 * Analyze a token and get comprehensive metrics
 */
export async function analyzeToken(tokenAddress: string): Promise<TokenWithMetrics | null> {
  try {
    // Fetch basic token info
    const tokenInfo = await getTokenInfo(tokenAddress);

    // Fetch metrics in parallel
    const [holderCount, totalSupply, pools] = await Promise.all([
      getTokenHolderCount(tokenAddress),
      getTokenTotalSupply(tokenAddress),
      getTokenPools(tokenAddress),
    ]);

    // Get liquidity from pools
    let totalLiquidity = 0;
    for (const poolAddress of pools) {
      const liquidity = await getPoolLiquidity(poolAddress);
      totalLiquidity += Number(formatUnits(liquidity, 18)); // Approximate
    }

    // Calculate market cap (simplified - would need price oracle)
    const price = 0; // TODO: Get actual price
    const marketCap = parseFloat(totalSupply) * price;

    const tokenWithMetrics: TokenWithMetrics = {
      ...tokenInfo,
      price,
      priceChange24h: 0, // TODO: Calculate from historical data
      volume24h: 0, // TODO: Calculate from swap events
      liquidity: totalLiquidity,
      marketCap,
      holderCount,
      createdAt: Date.now(),
      isVerified: false, // TODO: Check if contract is verified
    };

    return tokenWithMetrics;
  } catch (error) {
    console.error('Error analyzing token:', error);
    return null;
  }
}

/**
 * Detect potential honeypot characteristics
 */
export async function detectHoneypot(tokenAddress: string): Promise<{
  isHoneypot: boolean;
  reasons: string[];
}> {
  const reasons: string[] = [];

  try {
    // Check if we can get basic token info
    await getTokenInfo(tokenAddress);

    // Check holder count
    const holderCount = await getTokenHolderCount(tokenAddress);
    if (holderCount < 10) {
      reasons.push('Very few holders');
    }

    // Check liquidity
    const pools = await getTokenPools(tokenAddress);
    if (pools.length === 0) {
      reasons.push('No liquidity pools found');
    }

    // TODO: Add more honeypot detection:
    // - Check if sell transactions succeed (simulation)
    // - Check for high buy tax / sell tax
    // - Check for hidden mint functions
    // - Check for ownership concentration

    return {
      isHoneypot: reasons.length > 2,
      reasons,
    };
  } catch {
    return {
      isHoneypot: true,
      reasons: ['Failed to fetch token data'],
    };
  }
}

/**
 * Get trending tokens based on recent activity
 * Returns well-known Base tokens for Free tier (to avoid rate limits)
 */
export async function getTrendingTokens(limit: number = 20): Promise<TokenWithMetrics[]> {
  try {
    // For Free tier, return a curated list of known Base tokens
    // In paid tier, you'd scan recent pools
    const knownBaseTokens = [
      '0x4200000000000000000000000000000000000006', // WETH
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
      '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
      '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
      '0x940181a94A35A4569E4529A3CDfB74e38FD98631', // AERO (Aerodrome token)
      '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22', // cbETH
      '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452', // wstETH
    ];

    // Analyze a subset of known tokens
    const tokens: TokenWithMetrics[] = [];
    const tokensToFetch = knownBaseTokens.slice(0, Math.min(limit, 7));
    
    for (const address of tokensToFetch) {
      try {
        const token = await analyzeToken(address);
        if (token) {
          tokens.push(token);
        }
      } catch (error) {
        console.error(`Error analyzing token ${address}:`, error);
        // Continue with other tokens
      }
    }

    // Sort by liquidity
    return tokens.sort((a, b) => b.liquidity - a.liquidity);
  } catch (error) {
    console.error('Error getting trending tokens:', error);
    return [];
  }
}

