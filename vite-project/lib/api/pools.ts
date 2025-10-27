import {
  getPoolAddress,
  getPoolLiquidity,
  getTokenPools,
} from '../services/dex/uniswap-v3';
import { getRecentPools, startPoolScanner } from '../services/scanner';
import { LiquidityPool } from '../types';

/**
 * Pools API - Liquidity pool operations
 */
export const poolsApi = {
  /**
   * Get pool address for a token pair
   */
  getPoolAddress: async (
    token0: string,
    token1: string,
    fee?: number
  ): Promise<string | null> => {
    return getPoolAddress(token0, token1, fee);
  },

  /**
   * Get pool liquidity
   */
  getPoolLiquidity: async (poolAddress: string): Promise<bigint> => {
    return getPoolLiquidity(poolAddress);
  },

  /**
   * Get all pools for a token
   */
  getTokenPools: async (tokenAddress: string): Promise<string[]> => {
    return getTokenPools(tokenAddress);
  },

  /**
   * Get recently created pools
   */
  getRecentPools: async (blocksToScan?: number): Promise<LiquidityPool[]> => {
    return getRecentPools(blocksToScan);
  },

  /**
   * Start watching for new pools
   */
  watchNewPools: (callback: (pool: LiquidityPool) => void): (() => void) => {
    return startPoolScanner(callback);
  },
};

