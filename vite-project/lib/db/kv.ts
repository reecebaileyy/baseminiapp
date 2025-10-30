import { kv } from '@vercel/kv';
import type { DiscoveredToken, EnrichedToken, TokenDiscoveryProgress } from '../types/index.js';

// Check if KV is configured
function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL || process.env.KV_URL);
}

/**
 * Vercel KV Client for token storage and caching
 */

// Storage key prefixes
const KEYS = {
  TOKEN: (address: string) => `token:${address.toLowerCase()}`,
  TOKENS_ALL: 'tokens:all',
  ENRICHED: (address: string) => `tokens:enriched:${address.toLowerCase()}`,
  TRENDING: 'tokens:trending',
  PROGRESS: 'discovery:progress',
} as const;

/**
 * Save a discovered token to KV
 */
export async function saveToken(token: DiscoveredToken): Promise<void> {
  if (!isKVConfigured()) {
    console.warn('KV not configured - skipping save');
    return;
  }

  try {
    const key = KEYS.TOKEN(token.address);
    
    // Save token metadata (no expiry)
    await kv.set(key, token);
    
    // Add to set of all tokens
    await kv.sadd(KEYS.TOKENS_ALL, token.address.toLowerCase());
    
    console.log(`Saved token ${token.symbol} (${token.address})`);
  } catch (error) {
    console.error(`Error saving token ${token.address}:`, error);
    throw error;
  }
}

/**
 * Get a token by address
 */
export async function getToken(address: string): Promise<DiscoveredToken | null> {
  try {
    const key = KEYS.TOKEN(address);
    const token = await kv.get<DiscoveredToken>(key);
    return token;
  } catch (error) {
    console.error(`Error getting token ${address}:`, error);
    return null;
  }
}

/**
 * Get all token addresses
 */
export async function getAllTokenAddresses(): Promise<string[]> {
  try {
    const addresses = await kv.smembers(KEYS.TOKENS_ALL);
    return (addresses as string[]) || [];
  } catch (error) {
    console.error('Error getting all tokens:', error);
    return [];
  }
}

/**
 * Get all tokens (full metadata)
 */
export async function getAllTokens(): Promise<DiscoveredToken[]> {
  if (!isKVConfigured()) {
    console.warn('KV not configured - returning empty list');
    return [];
  }

  try {
    const addresses = await getAllTokenAddresses();
    const tokens = await Promise.all(
      addresses.map(addr => getToken(addr))
    );
    return tokens.filter((token): token is DiscoveredToken => token !== null);
  } catch (error) {
    console.error('Error getting all tokens:', error);
    throw error;
  }
}

/**
 * Check if a token exists
 */
export async function tokenExists(address: string): Promise<boolean> {
  try {
    const key = KEYS.TOKEN(address);
    const exists = await kv.exists(key);
    return exists === 1;
  } catch (error) {
    console.error(`Error checking token existence ${address}:`, error);
    return false;
  }
}

/**
 * Save enriched token metrics with TTL
 */
export async function saveEnrichedToken(
  address: string,
  enriched: Partial<EnrichedToken>,
  ttlSeconds: number = 60
): Promise<void> {
  try {
    const key = KEYS.ENRICHED(address);
    await kv.setex(key, ttlSeconds, enriched);
  } catch (error) {
    console.error(`Error saving enriched token ${address}:`, error);
  }
}

/**
 * Get enriched token metrics from cache
 */
export async function getEnrichedToken(
  address: string
): Promise<Partial<EnrichedToken> | null> {
  try {
    const key = KEYS.ENRICHED(address);
    const enriched = await kv.get<Partial<EnrichedToken>>(key);
    return enriched;
  } catch (error) {
    console.error(`Error getting enriched token ${address}:`, error);
    return null;
  }
}

/**
 * Save trending tokens list with TTL
 */
export async function saveTrendingTokens(
  tokens: EnrichedToken[],
  ttlSeconds: number = 120
): Promise<void> {
  try {
    await kv.setex(KEYS.TRENDING, ttlSeconds, tokens);
  } catch (error) {
    console.error('Error saving trending tokens:', error);
  }
}

/**
 * Get trending tokens from cache
 */
export async function getTrendingTokens(): Promise<EnrichedToken[] | null> {
  try {
    const tokens = await kv.get<EnrichedToken[]>(KEYS.TRENDING);
    return tokens;
  } catch (error) {
    console.error('Error getting trending tokens:', error);
    return null;
  }
}

/**
 * Update discovery progress
 */
export async function updateDiscoveryProgress(
  lastScannedBlock: number,
  totalTokens: number
): Promise<void> {
  try {
    const progress: TokenDiscoveryProgress = {
      lastScannedBlock,
      totalTokensDiscovered: totalTokens,
      lastScanTimestamp: Date.now(),
    };
    await kv.set(KEYS.PROGRESS, progress);
  } catch (error) {
    console.error('Error updating discovery progress:', error);
  }
}

/**
 * Get discovery progress
 */
export async function getDiscoveryProgress(): Promise<TokenDiscoveryProgress | null> {
  try {
    const progress = await kv.get<TokenDiscoveryProgress>(KEYS.PROGRESS);
    return progress;
  } catch (error) {
    console.error('Error getting discovery progress:', error);
    return null;
  }
}

/**
 * Clear all enriched cache (useful for testing)
 */
export async function clearEnrichedCache(): Promise<void> {
  try {
    const addresses = await getAllTokenAddresses();
    await Promise.all(
      addresses.map(addr => kv.del(KEYS.ENRICHED(addr)))
    );
    await kv.del(KEYS.TRENDING);
  } catch (error) {
    console.error('Error clearing enriched cache:', error);
  }
}

