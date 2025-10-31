import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getTrendingTokens, getAllTokens } from '../lib/db/kv.js';
import { enrichTokenWithSubgraphData } from '../lib/services/enrichment.js';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST' && req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const secret = process.env.CRON_SECRET;
    if (secret && req.headers['x-cron-secret'] !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const limit = Number(process.env.REFRESH_LIMIT || req.query.limit || 50);

    // Determine top N tokens
    let addresses: string[] = [];
    const trending = await getTrendingTokens();
    if (trending && trending.length > 0) {
      addresses = trending.slice(0, limit).map(t => t.address.toLowerCase());
    } else {
      const all = await getAllTokens();
      addresses = all.slice(0, limit).map(t => t.address.toLowerCase());
    }

    const start = Date.now();
    const results = await Promise.allSettled(
      addresses.map(async (addr) => {
        // Enrich and refresh cache by calling enrichment directly
        // We need the DiscoveredToken object for enrichTokenWithSubgraphData
        const all = await getAllTokens();
        const tok = all.find(t => t.address.toLowerCase() === addr);
        if (!tok) throw new Error('Token not found in KV');
        await enrichTokenWithSubgraphData(tok);
        return addr;
      })
    );

    const successes = results
      .filter(r => r.status === 'fulfilled')
      .map(r => (r as PromiseFulfilledResult<string>).value);
    const failures = results
      .filter(r => r.status === 'rejected')
      .map(r => ({ address: addresses[results.indexOf(r)], reason: (r as PromiseRejectedResult).reason?.message || 'unknown' }));

    const summary = {
      timestamp: Date.now(),
      count: addresses.length,
      durationMs: Date.now() - start,
      successes,
      failures,
    };

    console.log(JSON.stringify({ level: 'info', msg: 'refresh summary', ...summary }));

    await kv.set('refresh:lastRun', summary);

    return res.status(200).json({ success: true, ...summary });
  } catch (error) {
    console.error('Error in /api/refresh:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


