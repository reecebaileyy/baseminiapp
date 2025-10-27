import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { getWalletTokens, getTokenFromAddress } from '@/lib/services/wallet-tokens';

/**
 * Fetch all tokens owned by connected wallet
 */
export function useWalletTokens() {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['wallet', 'tokens', address],
    queryFn: () => getWalletTokens(address!),
    enabled: isConnected && !!address,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch token info from contract address
 */
export function useTokenFromAddress(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['token', 'address', tokenAddress],
    queryFn: () => getTokenFromAddress(tokenAddress!),
    enabled: !!tokenAddress && tokenAddress.length === 42,
    staleTime: 300000, // 5 minutes (token metadata rarely changes)
    retry: 1,
  });
}

