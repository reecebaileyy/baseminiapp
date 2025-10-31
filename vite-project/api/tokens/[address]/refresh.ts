import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getToken } from '../../../lib/db/kv.js';
import { deleteHolderCount, deleteEnriched } from '../../../lib/db/kv.js';
import { enrichTokenWithSubgraphData } from '../../../lib/services/enrichment.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST' && req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { address } = req.query;
    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Missing token address' });
    }

    // Optional protection via CRON_SECRET for manual triggers
    const secret = process.env.CRON_SECRET;
    if (secret && req.headers['x-cron-secret'] !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = await getToken(address.toLowerCase());
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }

    // Bust caches so the enrichment and holder scan recompute
    await deleteHolderCount(address);
    await deleteEnriched(address);

    const start = Date.now();
    const enriched = await enrichTokenWithSubgraphData(token);

    return res.status(200).json({
      success: true,
      address: token.address,
      durationMs: Date.now() - start,
      enriched,
    });
  } catch (error) {
    console.error('Error in /api/tokens/[address]/refresh:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


