import type { VercelRequest, VercelResponse } from '@vercel/node';

export function verifyRequestAuth(req: VercelRequest, res: VercelResponse): boolean {
  try {
    const ua = String(req.headers['user-agent'] || '');
    const isVercelCron = ua.includes('Vercel-Cron');
    if (isVercelCron) {
      console.log('[CRON] Triggered via Vercel Scheduler');
    }
    const provided = req.headers['x-cron-secret'];
    const validSecret = typeof provided === 'string' && provided === process.env.CRON_SECRET;

    if (process.env.CRON_SECRET && !validSecret && !isVercelCron) {
      res.status(401).json({ error: 'Unauthorized' });
      return false;
    }
    return true;
  } catch {
    // Fail closed if something odd happens
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
}


