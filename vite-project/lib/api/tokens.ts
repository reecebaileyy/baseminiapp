import {
  getTokenInfo,
  getTokenBalance,
  getTokenHolderCount,
  getTokenTotalSupply,
  getTokenMetadata,
  getTokenBalances,
} from '../services/token';
import { analyzeToken, getTrendingTokens, detectHoneypot } from '../services/scanner';
import type { Token, TokenWithMetrics } from '../types';

/**
 * Tokens API - All token-related functions in one place
 */
export const tokensApi = {
  /**
   * Get basic token information
   */
  getInfo: async (tokenAddress: string): Promise<Token> => {
    return getTokenInfo(tokenAddress);
  },

  /**
   * Get detailed token metrics
   */
  getDetails: async (tokenAddress: string): Promise<TokenWithMetrics | null> => {
    return analyzeToken(tokenAddress);
  },

  /**
   * Get token balance for a wallet
   */
  getBalance: async (tokenAddress: string, walletAddress: string): Promise<string> => {
    return getTokenBalance(tokenAddress, walletAddress);
  },

  /**
   * Get multiple token balances
   */
  getBalances: async (
    walletAddress: string,
    tokenAddresses: string[]
  ): Promise<Record<string, string>> => {
    return getTokenBalances(walletAddress, tokenAddresses);
  },

  /**
   * Get token holder count
   */
  getHolderCount: async (tokenAddress: string): Promise<number> => {
    return getTokenHolderCount(tokenAddress);
  },

  /**
   * Get token total supply
   */
  getTotalSupply: async (tokenAddress: string): Promise<string> => {
    return getTokenTotalSupply(tokenAddress);
  },

  /**
   * Get token metadata (logo, etc.)
   */
  getMetadata: async (tokenAddress: string) => {
    return getTokenMetadata(tokenAddress);
  },

  /**
   * Get trending/recent tokens
   */
  getTrending: async (limit?: number): Promise<TokenWithMetrics[]> => {
    return getTrendingTokens(limit);
  },

  /**
   * Check if token is a honeypot
   */
  checkHoneypot: async (
    tokenAddress: string
  ): Promise<{ isHoneypot: boolean; reasons: string[] }> => {
    return detectHoneypot(tokenAddress);
  },
};

