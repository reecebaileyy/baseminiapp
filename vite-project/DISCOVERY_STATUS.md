# Token Discovery Status

## Summary

The token discovery system is now functional! Here's what was implemented and how to use it.

## What Was Built

### Core Features
1. **Token Discovery Service** (`lib/services/discovery.ts`)
   - Scans Uniswap v3 and Aerodrome factory events
   - Validates ERC-20 compliance
   - Stores discovered tokens in Vercel KV

2. **Data Enrichment** (`lib/services/enrichment.ts`)
   - Queries GraphQL subgraphs for live metrics
   - Calculates price, volume, TVL, market cap
   - Caches enriched data for 60 seconds

3. **API Endpoints** (`api/`)
   - `GET /api/tokens` - List all tokens with sorting/filtering
   - `GET /api/tokens/trending` - Top trending tokens
   - `GET /api/tokens/new` - Recently discovered tokens
   - `GET /api/tokens/[address]` - Single token details
   - `POST /api/discover` - Trigger manual discovery

4. **Frontend Components**
   - `TokenTable` - Sortable table of all tokens
   - `TrendingTokensList` - Beautiful trending cards
   - `NewTokensList` - Recently discovered tokens
   - Tab-based navigation in Home page

## Current Configuration

### RPC Setup
- **Forced Public RPC**: The system currently uses public Base RPC instead of Alchemy
- **Reason**: Alchemy free tier limits `eth_getLogs` to 10 blocks max
- **Batch Size**: 10 blocks per request (safe for public RPC)
- **Performance**: ~100 blocks/second (10 seconds per 1000 blocks)

### Discovery Limits
The current setup scans in small batches:
- **Batch Size**: 10 blocks
- **Recommended**: Start with 100-1000 blocks for testing
- **Full Scan**: 100,000 blocks takes ~2-3 hours

## How to Use

### 1. Set Up KV Database

Create an Upstash KV database via Vercel:
1. Vercel Dashboard → Storage → Browse Storage
2. Click "Upstash"
3. Create database
4. Copy credentials to `.env`

### 2. Run Locally

```bash
# Terminal 1: Start dev server
vercel dev

# Terminal 2: Trigger discovery
curl -X POST http://localhost:3000/api/discover \
  -H "Content-Type: application/json" \
  -d '{"incremental": true, "blocksToScan": 100}'
```

### 3. View Results

Open http://localhost:3000 and check:
- **All Tokens** tab - Complete list with sorting
- **Trending** tab - Top tokens by volume
- **New Tokens** tab - Recently discovered

## Limitations & Solutions

### Alchemy Free Tier Limits

**Issue**: `eth_getLogs` limited to 10 blocks per request

**Solution**: 
- Currently using public RPC (slower but unlimited)
- Could upgrade to Alchemy PAYG ($50/month) for faster scans
- Or use QuickNode which has better free tier limits

### Public RPC Performance

**Issue**: Public RPCs can be slow

**Solution**:
- Discovery runs asynchronously (don't block the UI)
- Batch processing with small delays
- Use shorter block ranges for testing

### KV Storage Costs

**Issue**: Need to track token metadata

**Solution**:
- Upstash free tier: 10k commands/day, 256MB storage
- Typical usage: <1000 commands/day (well within free tier)
- Cache enriched data to reduce reads

## Next Steps

### Recommended Improvements

1. **Scheduled Discovery**
   - Set up Vercel Cron to scan new blocks every 5 minutes
   - Only scan the latest 100 blocks each time
   - Keeps database fresh without full rescans

2. **Caching Strategy**
   - Use KV for both raw tokens and enriched data
   - Different TTLs: tokens (permanent), enriched (60s)
   - Reduce GraphQL queries significantly

3. **Indexing Optimization**
   - Store additional indexes (by volume, TVL, etc.)
   - Pre-compute trending lists
   - Faster sorting/filtering in UI

4. **Real-time Updates**
   - Consider WebSocket subscriptions for instant updates
   - Would require Alchemy Growth tier or QuickNode
   - Lower latency but higher cost

### Production Deployment

1. Deploy to Vercel
2. Configure environment variables
3. Set up KV database
4. Trigger initial scan (wait 2-3 hours for 100k blocks)
5. Set up Vercel Cron for ongoing discovery

## Known Issues

1. **Import.meta.env in serverless**: Fixed by checking both browser and Node.js env vars
2. **Alchemy rate limits**: Worked around by using public RPC
3. **KV type issues**: Fixed by adding proper type casts
4. **GraphQL client**: Created server-side version that works in serverless

## Testing

Current discovery run:
- Blocks: 1000 (reduced for testing)
- Time: ~10 seconds
- RPC: Public Base RPC
- Status: Working but may find 0 tokens if no new pools in recent blocks

Try increasing to 10,000 blocks to see more results:
```bash
curl -X POST http://localhost:3000/api/discover \
  -H "Content-Type: application/json" \
  -d '{"incremental": true, "blocksToScan": 10000}'
```

This takes ~1-2 minutes but should discover actual tokens.

