export type RefreshResult = {
  success: boolean;
  timestamp: number;
  count: number;
  durationMs: number;
  successes: string[];
  failures: { address: string; reason: string }[];
};

export type UseRefreshReturn = {
  refresh: (opts?: { limit?: number; secret?: string }) => Promise<RefreshResult | null>;
  isRefreshing: boolean;
  error: string | null;
};

/**
 * Triggers the /api/refresh background job to update cached enrichment for top tokens.
 */
export function useRefresh(): UseRefreshReturn {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (opts?: { limit?: number; secret?: string }): Promise<RefreshResult | null> => {
    try {
      setIsRefreshing(true);
      setError(null);
      const params = new URLSearchParams();
      if (opts?.limit) params.set('limit', String(opts.limit));
      const res = await fetch(`/api/refresh?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(opts?.secret ? { 'x-cron-secret': opts.secret } : {}),
        },
      });
      if (!res.ok) throw new Error('Failed to refresh');
      const json = (await res.json()) as RefreshResult;
      return json;
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
      return null;
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refresh, isRefreshing, error };
}

import { useState } from 'react';


