import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAllTokens } from '../../lib/db/kv.js';
import { enrichMultipleTokens } from '../../lib/services/enrichment.js';
import type { EnrichedToken } from '../../lib/types/index.js';

/**
 * GET /api/tokens/new
 * 
 * Returns recently discovered tokens from the last 24 hours
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get all tokens and enrich
    const allTokens = await getAllTokens();
    const enriched = await enrichMultipleTokens(allTokens);

    // Filter to tokens from last 24 hours
    const now = Math.floor(Date.now() / 1000);
    const twentyFourHoursAgo = now - 86400;

    const newTokens = enriched
      .filter(token => token.createdAtTimestamp >= twentyFourHoursAgo)
      .sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);

    return res.status(200).json({
      data: newTokens,
      success: true,
    });
  } catch (error) {
    console.error('Error in /api/tokens/new:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

