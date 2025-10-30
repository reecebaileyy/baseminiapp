import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getToken } from '../../lib/db/kv.js';
import { getEnrichedTokenData } from '../../lib/services/enrichment.js';

/**
 * GET /api/tokens/[address]
 * 
 * Returns detailed information for a specific token
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { address } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid address parameter' });
    }

    // Get token from KV
    const token = await getToken(address.toLowerCase());

    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }

    // Get enriched data
    const enriched = await getEnrichedTokenData(token);

    return res.status(200).json({
      data: enriched,
      success: true,
    });
  } catch (error) {
    console.error('Error in /api/tokens/[address]:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

