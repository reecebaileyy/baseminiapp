export type StatusData = {
  lastBlockScanned: { blockNumber: number; timestamp: string } | null;
  totalTokens: number;
  cachedTokens: number;
  lastRefresh: { timestamp: number; count: number; durationMs: number; successes?: string[]; failures?: { address: string; reason: string }[] } | null;
  kvUsage: { keysIndexed: number; kvLatencyMs: number } | null;
  rpcMode: 'HTTP' | 'WebSocket';
  rpcLatencyMs: number | null;
};

export type UseStatusResult = {
  data: StatusData | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

/**
 * Fetches system status from /api/status for dashboards and health widgets.
 */
export function useStatus(): UseStatusResult {
  const [data, setData] = useState<StatusData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Failed to fetch status');
      const json = await res.json();
      setData(json as StatusData);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return { data, isLoading, isError, refetch: fetchStatus };
}

import { useEffect, useState } from 'react';


