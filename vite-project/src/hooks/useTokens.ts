import { useQuery } from '@tanstack/react-query';
import { tokensApi } from 'lib/api/tokens';

/**
 * Fetch trending tokens
 */
export function useTrendingTokens(limit?: number) {
  return useQuery({
    queryKey: ['tokens', 'trending', limit],
    queryFn: () => tokensApi.getTrending(limit),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000,
  });
}

/**
 * Fetch token details
 */
export function useTokenDetails(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', tokenAddress],
    queryFn: () => tokensApi.getDetails(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 10000,
  });
}

/**
 * Fetch token info
 */
export function useTokenInfo(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'info', tokenAddress],
    queryFn: () => tokensApi.getInfo(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 300000,
  });
}

/**
 * Fetch token balance for a wallet
 */
export function useTokenBalance(tokenAddress: string | undefined, walletAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'balance', tokenAddress, walletAddress],
    queryFn: () => tokensApi.getBalance(tokenAddress!, walletAddress!),
    enabled: !!tokenAddress && !!walletAddress,
    staleTime: 5000, 
    refetchInterval: 10000,
  });
}

/**
 * Fetch multiple token balances
 */
export function useTokenBalances(
  walletAddress: string | undefined,
  tokenAddresses: string[]
) {
  return useQuery({
    queryKey: ['tokens', 'balances', walletAddress, tokenAddresses],
    queryFn: () => tokensApi.getBalances(walletAddress!, tokenAddresses),
    enabled: !!walletAddress && tokenAddresses.length > 0,
    staleTime: 5000,
    refetchInterval: 10000,
  });
}

/**
 * Check if token is a honeypot
 */
export function useHoneypotCheck(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'honeypot', tokenAddress],
    queryFn: () => tokensApi.checkHoneypot(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 3600000, 
  });
}

/**
 * Get token holder count
 */
export function useTokenHolderCount(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'holders', tokenAddress],
    queryFn: () => tokensApi.getHolderCount(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 30000,
  });
}

