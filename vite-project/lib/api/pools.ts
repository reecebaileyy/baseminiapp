import {
  getPoolAddress,
  getPoolLiquidity,
  getTokenPools,
} from '../services/dex/uniswap-v3';
import type { LiquidityPool } from '../types';

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
    const { getRecentPools } = await import('../services/scanner');
    return getRecentPools(blocksToScan);
  },

  /**
   * Start watching for new pools
   */
  watchNewPools: (callback: (pool: LiquidityPool) => void): (() => void) => {
    try {
      // Lazy-load to avoid bundling server-leaning code in client
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('../services/scanner') as { startPoolScanner: (cb: (pool: LiquidityPool) => void) => () => void };
      return mod.startPoolScanner(callback);
    } catch (e) {
      return () => {};
    }
  },
};

