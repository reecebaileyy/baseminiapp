# Prisma Token Discovery Schema

This Prisma schema is designed for future migration from Vercel KV to a Postgres database (Neon, Supabase, etc.).

## Current State

- **Current storage**: Vercel KV (Redis-based)
- **Future storage**: Postgres with Prisma ORM

## Models

### Token
Stores discovered ERC-20 tokens with metadata and enriched metrics.

**Key fields:**
- `address` (unique) - ERC-20 token contract address
- `name`, `symbol`, `decimals`, `totalSupply` - Basic token info
- `deployer`, `createdAtBlock`, `createdAtTimestamp` - Deployment info
- `discoveredFrom` - Source DEX (uniswap-v3 or aerodrome)
- `priceUSD`, `volume24h`, `tvlUSD`, `marketCap` - Live metrics
- `isListed`, `sourceDEX`, `poolCount`, `holderCount` - DEX status

**Indexes:**
- `isListed` - Filter listed/unlisted tokens
- `volume24h` - Sort by trading volume
- `tvlUSD` - Sort by liquidity
- `createdAtTimestamp` - Show new tokens
- `sourceDEX` - Filter by DEX

### DiscoveryProgress
Tracks token discovery progress to avoid re-scanning blocks.

### TokenMetricsHistory (optional)
Historical price/volume data for charts (future feature).

## Migration Guide

### When KV becomes insufficient:

1. **Create Postgres database**
   - Neon: https://neon.tech
   - Supabase: https://supabase.com
   - Railway: https://railway.app

2. **Set DATABASE_URL**
   ```bash
   DATABASE_URL="postgresql://user:pass@host:5432/dbname"
   ```

3. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Migrate data from KV to Postgres**
   - Create migration script to read from KV and write to Postgres
   - Update all services to use Prisma instead of KV

5. **Update API routes**
   - Replace KV read/write operations with Prisma queries
   - Optimize queries with indexes

## Example Prisma Queries

```typescript
import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

// Get all listed tokens sorted by volume
const tokens = await prisma.token.findMany({
  where: { isListed: true },
  orderBy: { volume24h: 'desc' },
  take: 100,
});

// Get new tokens from last 24h
const newTokens = await prisma.token.findMany({
  where: {
    createdAtTimestamp: {
      gte: Math.floor(Date.now() / 1000) - 86400,
    },
  },
  orderBy: { createdAtTimestamp: 'desc' },
});

// Update token metrics
await prisma.token.update({
  where: { address },
  data: {
    priceUSD,
    volume24h,
    tvlUSD,
    lastUpdated: Date.now(),
  },
});
```

## Benefits of Postgres over KV

- **Complex queries**: JOINs, aggregations, full-text search
- **Better analytics**: Historical data, trends, time-series queries
- **Transactions**: ACID guarantees for data consistency
- **Indexes**: More efficient sorting and filtering
- **Relationships**: Token-pool-user relationships
- **Scalability**: Handle millions of tokens efficiently

## When to Migrate

Consider migrating when:
- Token count exceeds 50,000
- Need complex analytics/queries
- Want historical price tracking
- KV costs become prohibitive
- Need multi-table relationships

For MVP, Vercel KV is sufficient and faster.

