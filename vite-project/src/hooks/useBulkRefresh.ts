import { useState, useCallback } from 'react';

export type BulkRefreshResult = {
  success: boolean;
  count: number;
  durationMs: number;
  successes: string[];
  failures: { address: string; reason: string }[];
};

export function useBulkRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BulkRefreshResult | null>(null);

  const refreshMany = useCallback(async (addresses: string[], opts?: { secret?: string }) => {
    if (!addresses || addresses.length === 0) return null;
    setIsRefreshing(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/tokens/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(opts?.secret ? { 'x-cron-secret': opts.secret } : {}),
        },
        body: JSON.stringify({ addresses }),
      });
      if (!res.ok) throw new Error(`Bulk refresh failed (${res.status})`);
      const json = (await res.json()) as BulkRefreshResult;
      setResult(json);
      return json;
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return { refreshMany, isRefreshing, error, result };
}


