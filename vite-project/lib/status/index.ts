import { kv } from '@vercel/kv';
import { getDiscoveryProgress, getDiscoveryState } from '../db/kv.js';
import { serverPublicClient, getRpcMode, getRpcUrls } from '../config/client.js';

export async function kvLatencyProbe(): Promise<number> {
  const start = Date.now();
  await kv.ping?.(); // optional; if not available, do a trivial op
  const end = Date.now();
  return end - start;
}

export async function getCachedTokensCount(): Promise<number> {
  try {
    const members = await kv.smembers('cache:tokens:index');
    return Array.isArray(members) ? members.length : 0;
  } catch {
    return 0;
  }
}

export async function getRpcLatencyMs(): Promise<number> {
  const start = Date.now();
  await serverPublicClient.getBlockNumber();
  return Date.now() - start;
}

export async function getSystemStatus() {
  const [progress, state] = await Promise.all([
    getDiscoveryProgress(),
    getDiscoveryState(),
  ]);
  const [cachedTokens, kvLatencyMs, rpcLatencyMs] = await Promise.all([
    getCachedTokensCount(),
    kvLatencyProbe().catch(() => -1),
    getRpcLatencyMs().catch(() => -1),
  ]);

  let lastRefresh: any = null;
  try { lastRefresh = await kv.get('refresh:lastRun'); } catch {}

  const { httpUrl, wsUrl } = getRpcUrls();
  const redact = (url: string | undefined) => {
    if (!url) return null;
    try { return new URL(url).host; } catch { return url; }
  };

  return {
    lastBlockScanned: state ? { blockNumber: state.blockNumber, timestamp: new Date(state.timestamp).toISOString() } : null,
    totalTokens: progress?.totalTokensDiscovered ?? 0,
    cachedTokens,
    lastRefresh,
    kvUsage: { keysIndexed: cachedTokens, kvLatencyMs },
    rpcMode: getRpcMode(),
    rpcLatencyMs,
    rpcHttpHost: redact(httpUrl),
    rpcWsHost: redact(wsUrl),
  };
}


