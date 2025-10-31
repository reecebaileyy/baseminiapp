import { useState, useCallback } from 'react';

export type RefreshTokenResult = {
  success: boolean;
  address: string;
  durationMs: number;
};

/**
 * Hook to refresh a single token's enrichment/holderCount via API.
 */
export function useRefreshToken(address: string) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RefreshTokenResult | null>(null);

  const refresh = useCallback(async (opts?: { secret?: string }) => {
    if (!address) return null;
    setIsRefreshing(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/tokens/${address}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(opts?.secret ? { 'x-cron-secret': opts.secret } : {}),
        },
      });
      if (!res.ok) throw new Error(`Refresh failed (${res.status})`);
      const json = (await res.json()) as RefreshTokenResult;
      setResult(json);
      return json;
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, [address]);

  return { refresh, isRefreshing, error, result };
}


