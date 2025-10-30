import { useQuery } from '@tanstack/react-query';
import type { TokenQueryParams, EnrichedToken, PaginatedResponse } from 'lib/types';

/**
 * Fetch discovered tokens with pagination, sorting, and filtering
 */
export function useDiscoveredTokens(params?: TokenQueryParams) {
  const { sort, order, limit, offset, filter } = params || {};

  return useQuery<PaginatedResponse<any>>({
    queryKey: ['discovered-tokens', sort, order, limit, offset, filter],
    queryFn: async () => {
      const url = new URL('/api/tokens', window.location.origin);
      if (sort) url.searchParams.set('sort', sort);
      if (order) url.searchParams.set('order', order);
      if (limit) url.searchParams.set('limit', limit.toString());
      if (offset) url.searchParams.set('offset', offset.toString());
      if (filter) url.searchParams.set('filter', filter);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }

      return response.json();
    },
    staleTime: 60000, // 1 minute
  });
}

/**
 * Fetch trending tokens
 */
export function useTrendingTokens() {
  return useQuery({
    queryKey: ['trending-tokens'],
    queryFn: async () => {
      // Fetch with sort=volume, limit=10, filter=listed
      const url = new URL('/api/tokens', window.location.origin);
      url.searchParams.set('sort', 'volume');
      url.searchParams.set('order', 'desc');
      url.searchParams.set('limit', '10');
      url.searchParams.set('filter', 'listed');
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch trending tokens');
      }

      const data = await response.json();
      return data.data as EnrichedToken[];
    },
    staleTime: 120000, // 2 minutes
    refetchInterval: 120000, // Refetch every 2 minutes
  });
}

/**
 * Fetch new tokens from last 24 hours
 */
export function useNewTokens() {
  return useQuery({
    queryKey: ['new-tokens'],
    queryFn: async () => {
      // Fetch with sort=created, order=desc, limit=50
      const url = new URL('/api/tokens', window.location.origin);
      url.searchParams.set('sort', 'created');
      url.searchParams.set('order', 'desc');
      url.searchParams.set('limit', '50');
      url.searchParams.set('filter', 'all');
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch new tokens');
      }

      const data = await response.json();
      return data.data as EnrichedToken[];
    },
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Fetch single token details
 */
export function useTokenDetails(address: string | undefined) {
  return useQuery({
    queryKey: ['token-details', address],
    queryFn: async () => {
      if (!address) throw new Error('Address required');

      const response = await fetch(`/api/tokens/${address}`);
      if (!response.ok) {
        throw new Error('Failed to fetch token details');
      }

      const data = await response.json();
      return data.data as EnrichedToken;
    },
    enabled: !!address,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Trigger token discovery
 */
export function useTriggerDiscovery() {
  return useQuery({
    queryKey: ['trigger-discovery'],
    queryFn: async () => {
      const response = await fetch('/api/discover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incremental: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger discovery');
      }

      return response.json();
    },
    enabled: false, // Manual trigger only
    retry: false,
  });
}

