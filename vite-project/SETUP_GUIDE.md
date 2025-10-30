# Token Discovery Setup Guide

## Quick Start with Vercel + Upstash KV

### 1. Create KV Database via Upstash

1. Go to your Vercel dashboard for your project
2. Click **Storage** in the left sidebar
3. Click **Browse Storage** or **Create Database**
4. Click on **Upstash** (the green spiral logo)
5. Create a new Upstash KV database
6. Choose a name (e.g., "baseminiapp-tokens")
7. Select a region close to you
8. Click **Create**

### 2. Connect KV to Your Vercel Project

After creating the database:
- Vercel will automatically set the environment variables
- Look for these variables in your project settings:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`

### 3. Deploy Your Project

```bash
# If not already deployed
vercel --prod

# Or push to your connected Git repo
git push
```

### 4. Trigger Token Discovery

After deployment, call the discovery endpoint:

**Using cURL:**
```bash
curl -X POST https://your-app.vercel.app/api/discover \
  -H "Content-Type: application/json" \
  -d '{"incremental": true, "blocksToScan": 100000}'
```

**Using Vercel Dashboard:**
1. Go to your deployed project
2. Open the Functions tab
3. Click on `/api/discover`
4. Use the test interface to trigger a POST request

**Or add this to your frontend:**

Create a simple admin panel or add a button to trigger discovery (only for testing/admin use).

### 5. View Tokens

Once discovery completes:
- Open your deployed app
- Navigate to the "All Tokens" tab
- You should see discovered tokens!

## Alternative Setup: Local Development

### 1. Create Upstash KV Database

Go to [Upstash Console](https://console.upstash.com/) and create a free KV database.

### 2. Get Connection Details

Copy the REST URL and Token from the Upstash dashboard.

### 3. Add to `.env`

```bash
KV_REST_API_URL=https://your-db.upstash.io
KV_REST_API_TOKEN=your-token-here
```

### 4. Run with Vercel CLI

```bash
# Install Vercel CLI if not already
npm install -g vercel

# Run dev server
vercel dev
```

### 5. Trigger Discovery

In another terminal:

```bash
curl -X POST http://localhost:3000/api/discover \
  -H "Content-Type: application/json" \
  -d '{"incremental": true, "blocksToScan": 1000}'
```

Note: Start with 1000 blocks for testing (takes ~10 seconds), then use 100000 for full scan.

### 6. View in Browser

Open http://localhost:3000 and check the tokens!

## Troubleshooting

### "No tokens found" message
- Check that KV is properly configured
- Trigger discovery first (POST to /api/discover)
- Check Vercel function logs for errors

### Discovery taking too long
- Reduce `blocksToScan` parameter (try 1000 first)
- Check your RPC rate limits
- Use Alchemy API key for better rate limits

### Rate limiting errors
- Add `VITE_ALCHEMY_API_KEY` to your `.env`
- Wait a few minutes between discovery runs
- Split discovery into smaller batches

### Cost concerns
- Upstash KV free tier: 10,000 commands/day
- Each discovery scan uses ~10-50 commands
- After free tier: $0.20 per 100,000 commands
- Production usage will be minimal if you only scan when needed

## Cost Estimation

**Upstash KV (Free Tier):**
- 10,000 commands/day free
- 256 MB storage
- Usually sufficient for development and small production

**Production Usage:**
- Discovery: ~10-50 commands per scan
- API reads: ~1 command per request
- With caching, you'll stay well within free tier for most use cases

## Next Steps

After setup:
1. ✅ Tokens are discovered and stored
2. ✅ Frontend displays all tokens
3. ⚠️ Consider adding scheduled discovery (Vercel Cron)
4. ⚠️ Consider adding API authentication for /api/discover
5. ⚠️ Monitor KV usage in Upstash console

## Security Notes

- The `/api/discover` endpoint is currently unauthenticated
- Add authentication for production:
  ```typescript
  // In api/discover.ts
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.DISCOVERY_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  ```
- Set `DISCOVERY_API_KEY` in Vercel environment variables
- Use the key when calling the endpoint in production

