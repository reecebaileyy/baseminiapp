import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getToken } from '../../lib/db/kv.js';
import { deleteHolderCount, deleteEnriched } from '../../lib/db/kv.js';
import { enrichTokenWithSubgraphData } from '../../lib/services/enrichment.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const addresses: string[] = Array.isArray(body?.addresses) ? body.addresses : [];
    if (addresses.length === 0) return res.status(400).json({ error: 'addresses[] required' });

    const secret = process.env.CRON_SECRET;
    if (secret && req.headers['x-cron-secret'] !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const start = Date.now();
    const results = await Promise.allSettled(addresses.map(async (addr) => {
      const token = await getToken(addr.toLowerCase());
      if (!token) throw new Error('Token not found');
      await deleteHolderCount(addr);
      await deleteEnriched(addr);
      await enrichTokenWithSubgraphData(token);
      return addr.toLowerCase();
    }));

    const successes = results.filter(r => r.status === 'fulfilled').map(r => (r as PromiseFulfilledResult<string>).value);
    const failures = results.filter(r => r.status === 'rejected').map((r, i) => ({ address: addresses[i], reason: (r as PromiseRejectedResult).reason?.message || 'unknown' }));

    return res.status(200).json({
      success: failures.length === 0,
      count: addresses.length,
      durationMs: Date.now() - start,
      successes,
      failures,
    });
  } catch (error) {
    console.error('Error in /api/tokens/refresh:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


