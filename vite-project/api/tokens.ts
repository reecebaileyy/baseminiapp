import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllTokens } from '../lib/db/kv.js';
import { getEnrichedTokenData, enrichTokenWithSubgraphData } from '../lib/services/enrichment.js';
import type { TokenQueryParams, EnrichedToken, PaginatedResponse } from '../lib/types/index.js';

/**
 * GET /api/tokens
 * 
 * Returns paginated list of tokens with optional sorting and filtering
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse query parameters
    const {
      sort = 'volume',
      order = 'desc',
      limit = 100,
      offset = 0,
      filter = 'all',
      status,
    } = req.query;

    // Handle status endpoint
    if (status === 'true') {
      try {
        const { getAllTokens } = await import('../lib/db/kv.js');
        const { getDiscoveryProgress } = await import('../lib/db/kv.js');
        
        const allTokens = await getAllTokens();
        const progress = await getDiscoveryProgress();
        
        const listedTokens = allTokens.filter((token: any) => {
          // We need to check isListed, but tokens might not have enrichment yet
          // For now, count tokens discovered from DEXes as listed
          return token.isListed;
        });

        return res.status(200).json({
          totalTokens: allTokens.length,
          listedTokens: listedTokens.length,
          lastScanBlock: progress?.lastScannedBlock || 0,
          lastUpdated: progress?.lastScanTimestamp 
            ? new Date(progress.lastScanTimestamp).toISOString()
            : new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error in status endpoint:', error);
        return res.status(200).json({
          totalTokens: 0,
          listedTokens: 0,
          lastScanBlock: 0,
          lastUpdated: new Date().toISOString(),
        });
      }
    }

    const sortField = sort as TokenQueryParams['sort'];
    const orderDir = order as 'asc' | 'desc';
    const limitNum = Math.min(Number(limit), 500); // Cap at 500
    const offsetNum = Number(offset);
    const filterType = filter as 'all' | 'listed' | 'unlisted';

    // Get all discovered tokens
    let allTokens;
    try {
      allTokens = await getAllTokens();
    } catch (error) {
      console.error('KV Error - returning empty list:', error);
      // Return empty list if KV is not configured (development)
      return res.status(200).json({
        data: [],
        total: 0,
        page: 0,
        pageSize: limitNum,
      });
    }

    // Enrich tokens with subgraph data
    // Skip enrichment if no tokens (for development without KV)
    let enriched: any[];
    if (allTokens.length === 0) {
      enriched = [];
    } else {
      console.log(`Enriching ${allTokens.length} tokens...`);
      try {
        enriched = await Promise.all(
          allTokens.map(token => getEnrichedTokenData(token))
        );
      } catch (error) {
        console.error('Error enriching tokens:', error);
        // Return basic tokens without enrichment on error
        enriched = allTokens.map(token => ({
          ...token,
          priceUSD: null,
          volume24h: 0,
          tvlUSD: 0,
          marketCap: null,
          isListed: false,
          sourceDEX: null,
          poolCount: 0,
          holderCount: 0,
        }));
      }
    }

    // Filter tokens
    let filtered = enriched;
    if (filterType === 'listed') {
      filtered = enriched.filter(token => token.isListed);
    } else if (filterType === 'unlisted') {
      filtered = enriched.filter(token => !token.isListed);
    }

    // Filter out tokens with all-zero metrics (only for 'listed' filter)
    // For 'listed', show only tokens with meaningful metrics
    if (filterType === 'listed') {
      filtered = filtered.filter(token => 
        token.priceUSD > 0 || token.volume24h > 0 || token.tvlUSD > 0
      );
    }

    // Sort tokens
    filtered.sort((a, b) => {
      let aVal: number;
      let bVal: number;

      switch (sortField) {
        case 'volume':
          aVal = a.volume24h;
          bVal = b.volume24h;
          break;
        case 'liquidity':
          aVal = a.tvlUSD;
          bVal = b.tvlUSD;
          break;
        case 'marketcap':
          aVal = a.marketCap || 0;
          bVal = b.marketCap || 0;
          break;
        case 'created':
          aVal = a.createdAtTimestamp;
          bVal = b.createdAtTimestamp;
          break;
        default:
          aVal = a.volume24h;
          bVal = b.volume24h;
      }

      return orderDir === 'desc' ? bVal - aVal : aVal - bVal;
    });

    // Paginate
    const paginated = filtered.slice(offsetNum, offsetNum + limitNum);

    // Convert to TokenWithMetrics format for frontend compatibility
    const formatted = paginated.map(token => ({
      address: token.address,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      chainId: 8453, // Base
      price: token.priceUSD || 0,
      priceChange24h: 0, // Not available yet
      volume24h: token.volume24h,
      liquidity: token.tvlUSD,
      marketCap: token.marketCap || 0,
      holderCount: token.holderCount,
      createdAt: token.createdAtTimestamp,
      isVerified: false, // Can be added later
      isListed: token.isListed,
      sourceDEX: token.sourceDEX,
      poolCount: token.poolCount,
    }));

    const response: PaginatedResponse<typeof formatted[0]> = {
      data: formatted,
      total: filtered.length,
      page: Math.floor(offsetNum / limitNum),
      pageSize: limitNum,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in /api/tokens:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

