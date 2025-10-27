import { useQuery } from '@tanstack/react-query';
import { poolsApi } from 'lib/api/pools';
import { useEffect, useState } from 'react';
import type { LiquidityPool } from 'lib/types';

/**
 * Get recent pools (limited to last 10 blocks for free tier)
 */
export function useRecentPools(blocksToScan: number = 10) {
  return useQuery({
    queryKey: ['pools', 'recent', blocksToScan],
    queryFn: () => poolsApi.getRecentPools(blocksToScan),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Get pools for a specific token
 */
export function useTokenPools(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['pools', 'token', tokenAddress],
    queryFn: () => poolsApi.getTokenPools(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Get pool address for a pair
 */
export function usePoolAddress(
  token0: string | undefined,
  token1: string | undefined,
  fee?: number
) {
  return useQuery({
    queryKey: ['pool', 'address', token0, token1, fee],
    queryFn: () => poolsApi.getPoolAddress(token0!, token1!, fee),
    enabled: !!token0 && !!token1,
    staleTime: 300000, // 5 minutes (pool addresses don't change)
  });
}

/**
 * Get pool liquidity
 */
export function usePoolLiquidity(poolAddress: string | undefined) {
  return useQuery({
    queryKey: ['pool', 'liquidity', poolAddress],
    queryFn: () => poolsApi.getPoolLiquidity(poolAddress!),
    enabled: !!poolAddress,
    staleTime: 10000, // 10 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Watch for new pool creations in real-time
 */
export function usePoolWatcher() {
  const [newPools, setNewPools] = useState<LiquidityPool[]>([]);

  useEffect(() => {
    let unwatch: (() => void) | undefined;
    let isMounted = true;

    const startWatching = async () => {
      try {
        unwatch = poolsApi.watchNewPools((pool) => {
          if (isMounted) {
            setNewPools((prev) => [pool, ...prev].slice(0, 50)); // Keep last 50
          }
        });
      } catch (error) {
        console.debug('Pool watcher not available:', error);
        // Silently fail - pool watching is optional feature
      }
    };

    startWatching();

    return () => {
      isMounted = false;
      if (unwatch && typeof unwatch === 'function') {
        try {
          unwatch();
        } catch (error) {
          console.debug('Error stopping pool watcher:', error);
          // Silently fail on cleanup
        }
      }
    };
  }, []);

  return { newPools };
}

