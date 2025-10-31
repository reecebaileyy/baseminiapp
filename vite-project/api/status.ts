import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemStatus } from '../lib/status/index.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = await getSystemStatus();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in /api/status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


