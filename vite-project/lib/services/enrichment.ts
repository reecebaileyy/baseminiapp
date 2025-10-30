import { queryUniswapV3, queryAerodrome } from './graphql-client.js';
import { getAllTokens, saveEnrichedToken } from '../db/kv.js';
import type { DiscoveredToken, EnrichedToken } from '../types/index.js';

/**
 * Token Enrichment Service
 * 
 * Enriches discovered tokens with live metrics from GraphQL subgraphs.
 */

interface SubgraphTokenData {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
  volume: string;
  volumeUSD: string;
  untrackedVolumeUSD: string;
  feesUSD: string;
  txCount: number;
  poolCount: number;
  totalValueLocked: string;
  totalValueLockedUSD: string;
  totalValueLockedUSDUntracked: string;
  derivedETH: string;
}

interface SubgraphPoolData {
  id: string;
  token0: { id: string; symbol: string };
  token1: { id: string; symbol: string };
  feeTier: number;
  volumeUSD: string;
  totalValueLockedUSD: string;
  token0Price: string;
  token1Price: string;
  liquidityProviderCount: number;
}

/**
 * Query token data from Uniswap v3 subgraph
 */
async function queryUniswapTokenData(tokenAddress: string): Promise<SubgraphTokenData | null> {
  try {
    const query = `
      query GetToken($id: ID!) {
        token(id: $id) {
          id
          symbol
          name
          decimals
          totalSupply
          volume
          volumeUSD
          untrackedVolumeUSD
          feesUSD
          txCount
          poolCount
          totalValueLocked
          totalValueLockedUSD
          totalValueLockedUSDUntracked
          derivedETH
        }
      }
    `;

    const result = await queryUniswapV3<{ token: SubgraphTokenData }>(query, { id: tokenAddress.toLowerCase() });
    return result?.token || null;
  } catch (error) {
    console.error(`Error querying Uniswap token data for ${tokenAddress}:`, error);
    return null;
  }
}

/**
 * Query token data from Aerodrome subgraph
 */
async function queryAerodromeTokenData(tokenAddress: string): Promise<SubgraphTokenData | null> {
  try {
    const query = `
      query GetToken($id: ID!) {
        token(id: $id) {
          id
          symbol
          name
          decimals
          totalSupply
          volume
          volumeUSD
          untrackedVolumeUSD
          feesUSD
          txCount
          poolCount
          totalValueLocked
          totalValueLockedUSD
          totalValueLockedUSDUntracked
          derivedETH
        }
      }
    `;

    const result = await queryAerodrome<{ token: SubgraphTokenData }>(query, { id: tokenAddress.toLowerCase() });
    return result?.token || null;
  } catch (error) {
    console.error(`Error querying Aerodrome token data for ${tokenAddress}:`, error);
    return null;
  }
}

/**
 * Get token price in USD
 */
async function getTokenPriceUSD(tokenAddress: string): Promise<number | null> {
  try {
    // Query ETH price from bundles
    const bundleQuery = `
      query GetETHPrice {
        bundles(first: 1) {
          id
          ethPriceUSD
        }
      }
    `;

    const bundleResult = await queryUniswapV3<{ bundles: Array<{ id: string; ethPriceUSD: string }> }>(bundleQuery);
    const ethPriceUSD = bundleResult?.bundles?.[0]?.ethPriceUSD;

    // Query token derivedETH value
    const tokenQuery = `
      query GetTokenPrice($id: ID!) {
        token(id: $id) {
          derivedETH
        }
      }
    `;

    const tokenResult = await queryUniswapV3<{ token: { derivedETH: string } }>(tokenQuery, { id: tokenAddress.toLowerCase() });
    const derivedETH = tokenResult?.token?.derivedETH;

    if (ethPriceUSD && derivedETH) {
      return parseFloat(ethPriceUSD) * parseFloat(derivedETH);
    }

    return null;
  } catch (error) {
    console.error(`Error getting token price for ${tokenAddress}:`, error);
    return null;
  }
}

/**
 * Enrich a single token with subgraph data
 */
export async function enrichTokenWithSubgraphData(
  token: DiscoveredToken
): Promise<Partial<EnrichedToken>> {
  const address = token.address;

  try {
    // Query both subgraphs
    const [uniData, aeroData, ethPrice] = await Promise.all([
      queryUniswapTokenData(address),
      queryAerodromeTokenData(address),
      getTokenPriceUSD(address),
    ]);

    // Determine source DEX and use best data
    let sourceDEX: 'uniswap-v3' | 'aerodrome' | 'both' | null = null;
    let volume24h = 0;
    let tvlUSD = 0;
    let poolCount = 0;
    let holderCount = 0;

    if (uniData && aeroData) {
      sourceDEX = 'both';
      volume24h = parseFloat(uniData.volumeUSD) + parseFloat(aeroData.volumeUSD);
      tvlUSD = parseFloat(uniData.totalValueLockedUSD) + parseFloat(aeroData.totalValueLockedUSD);
      poolCount = uniData.poolCount + aeroData.poolCount;
      holderCount = uniData.txCount + aeroData.txCount; // Approximate holder count from tx
    } else if (uniData) {
      sourceDEX = 'uniswap-v3';
      volume24h = parseFloat(uniData.volumeUSD);
      tvlUSD = parseFloat(uniData.totalValueLockedUSD);
      poolCount = uniData.poolCount;
      holderCount = uniData.txCount;
    } else if (aeroData) {
      sourceDEX = 'aerodrome';
      volume24h = parseFloat(aeroData.volumeUSD);
      tvlUSD = parseFloat(aeroData.totalValueLockedUSD);
      poolCount = aeroData.poolCount;
      holderCount = aeroData.txCount;
    }

    // Calculate market cap
    const marketCap = ethPrice && token.totalSupply && token.decimals
      ? ethPrice * (parseFloat(token.totalSupply) / Math.pow(10, token.decimals))
      : null;

    // Smart fallbacks for unlisted tokens
    const isListed = sourceDEX !== null;
    const enriched: Partial<EnrichedToken> = {
      priceUSD: isListed ? ethPrice : null,
      volume24h: isListed ? volume24h : 0,
      tvlUSD: isListed ? tvlUSD : 0,
      marketCap: isListed ? marketCap : null,
      isListed,
      sourceDEX,
      poolCount,
      holderCount,
    };

    // Cache the enriched data
    await saveEnrichedToken(address, enriched, 60);

    return enriched;
  } catch (error) {
    console.error(`Error enriching token ${address}:`, error);
    return {
      priceUSD: null,
      volume24h: 0,
      tvlUSD: 0,
      marketCap: null,
      isListed: false,
      sourceDEX: null,
      poolCount: 0,
      holderCount: 0,
    };
  }
}

/**
 * Enrich multiple tokens in batch
 */
export async function enrichMultipleTokens(
  tokens: DiscoveredToken[]
): Promise<EnrichedToken[]> {
  console.log(`Enriching ${tokens.length} tokens with subgraph data...`);

  const enriched = await Promise.all(
    tokens.map(async (token) => {
      const enrichedData = await enrichTokenWithSubgraphData(token);
      return {
        ...token,
        ...enrichedData,
      } as EnrichedToken;
    })
  );

  console.log(`Enriched ${enriched.length} tokens`);
  return enriched;
}

/**
 * Get enriched token data (from cache or enrichment)
 */
export async function getEnrichedTokenData(
  token: DiscoveredToken
): Promise<EnrichedToken> {
  // First check cache
  const { getEnrichedToken } = await import('../db/kv.js');
  const cached = await getEnrichedToken(token.address);

  if (cached) {
    return { ...token, ...cached } as EnrichedToken;
  }

  // Not cached, enrich now
  const enriched = await enrichTokenWithSubgraphData(token);
  return { ...token, ...enriched } as EnrichedToken;
}

/**
 * Calculate metrics from subgraph data
 */
export function calculateMetrics(
  token: DiscoveredToken,
  subgraphData: SubgraphTokenData | null,
  ethPrice: number | null
): Partial<EnrichedToken> {
  if (!subgraphData) {
    return {
      priceUSD: null,
      volume24h: 0,
      tvlUSD: 0,
      marketCap: null,
      isListed: false,
      sourceDEX: null,
      poolCount: 0,
      holderCount: 0,
    };
  }

  const priceUSD = ethPrice && subgraphData.derivedETH
    ? parseFloat(subgraphData.derivedETH) * ethPrice
    : null;

  const volume24h = parseFloat(subgraphData.volumeUSD);
  const tvlUSD = parseFloat(subgraphData.totalValueLockedUSD);

  const marketCap = priceUSD && token.totalSupply && token.decimals
    ? priceUSD * (parseFloat(token.totalSupply) / Math.pow(10, token.decimals))
    : null;

  return {
    priceUSD,
    volume24h,
    tvlUSD,
    marketCap,
    isListed: true,
    sourceDEX: 'uniswap-v3' as const,
    poolCount: subgraphData.poolCount,
    holderCount: subgraphData.txCount, // Approximate
  };
}

