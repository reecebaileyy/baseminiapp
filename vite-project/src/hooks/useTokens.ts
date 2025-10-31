import { useQuery } from '@tanstack/react-query';

/**
 * Fetch trending tokens
 */
// Note: Client-safe hooks only. Avoid importing server-side modules here.

/**
 * Fetch token details
 */
// Deprecated: Use hooks in useDiscoveredTokens.ts for token lists/details

/**
 * Fetch token info
 */
// Removed server-dependent hooks

/**
 * Fetch token balance for a wallet
 */
// Removed

/**
 * Fetch multiple token balances
 */
// Removed

/**
 * Check if token is a honeypot
 */
export function useHoneypotCheck(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'honeypot', tokenAddress],
    enabled: !!tokenAddress,
    staleTime: 3600000,
    queryFn: async () => {
      if (!tokenAddress) throw new Error('Address required');
      const res = await fetch(`/api/tokens/${tokenAddress}`);
      if (!res.ok) throw new Error('Failed to fetch token');
      const json = await res.json();
      const token = json?.data as {
        holderCount?: number;
        isListed?: boolean;
        poolCount?: number;
      } | undefined;

      const reasons: string[] = [];
      const holders = typeof token?.holderCount === 'number' ? token?.holderCount : 0;
      const isListed = !!token?.isListed;
      const pools = typeof token?.poolCount === 'number' ? token?.poolCount : 0;

      if (holders < 10) reasons.push('Very few holders');
      if (!isListed || pools === 0) reasons.push('No liquidity pools found');

      return { isHoneypot: reasons.length > 1, reasons } as { isHoneypot: boolean; reasons: string[] };
    },
  });
}

/**
 * Get token holder count
 */
// Removed

