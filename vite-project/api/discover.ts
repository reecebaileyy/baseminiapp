import type { VercelRequest, VercelResponse } from '@vercel/node';
import { discoverNewTokens, discoverNewTokensIncremental } from '../lib/services/discovery.js';
import { getDiscoveryProgress } from '../lib/db/kv.js';

/**
 * POST /api/discover
 * 
 * Triggers token discovery manually
 * Protected with API key check
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Discovery handler called');
  console.log('Method:', req.method);
  
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    console.log('Starting discovery process...');

    // Optional API key check (can be enabled if needed)
    const apiKey = process.env.DISCOVERY_API_KEY;
    if (apiKey && req.headers['x-api-key'] !== apiKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { incremental = true, blocksToScan = 100000 } = req.body || {};

    console.log(`Starting token discovery - incremental: ${incremental}, blocks: ${blocksToScan}`);

    // Trigger discovery
    let newTokensCount: number;
    if (incremental) {
      newTokensCount = await discoverNewTokensIncremental(Number(blocksToScan));
    } else {
      newTokensCount = await discoverNewTokens(Number(blocksToScan));
    }

    // Get updated progress
    const progress = await getDiscoveryProgress();

    return res.status(200).json({
      success: true,
      message: `Discovery complete`,
      newTokensFound: newTokensCount,
      progress: progress,
    });
  } catch (error) {
    console.error('Error in /api/discover:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

