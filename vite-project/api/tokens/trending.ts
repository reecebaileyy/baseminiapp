import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getTrendingTokens, saveTrendingTokens, getAllTokens } from '../../lib/db/kv.js';
import { enrichMultipleTokens } from '../../lib/services/enrichment.js';

/**
 * GET /api/tokens/trending
 * 
 * Returns top trending tokens sorted by 24h volume growth
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check cache first
    const cached = await getTrendingTokens();
    if (cached) {
      console.log('Returning cached trending tokens');
      return res.status(200).json({ data: cached, success: true });
    }

    // Get all tokens and enrich
    const allTokens = await getAllTokens();
    const enriched = await enrichMultipleTokens(allTokens);

    // Filter to only listed tokens and sort by volume
    const listed = enriched
      .filter(token => token.isListed && token.volume24h > 0)
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, 50); // Top 50

    // Save to cache
    await saveTrendingTokens(listed, 120);

    return res.status(200).json({ data: listed, success: true });
  } catch (error) {
    console.error('Error in /api/tokens/trending:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

