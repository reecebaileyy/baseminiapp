## MVP Upgrades (Dual RPC, Persistence, Caching, Monitoring)

### Overview
This document summarizes the MVP upgrade work across RPC configuration, discovery persistence, enrichment caching, background refresh, system status, and typed frontend hooks.

### Files and Modules
- RPC config: `lib/config/client.ts`
- Discovery service: `lib/services/discovery.ts`
- Enrichment service: `lib/services/enrichment.ts`
- KV helpers: `lib/db/kv.ts`
- Status helpers: `lib/status/index.ts`
- API routes: `api/discover.ts`, `api/tokens.ts`, `api/refresh.ts`, `api/status.ts`
- Frontend hooks: `src/hooks/useStatus.ts`, `src/hooks/useRefresh.ts`
- Cron: `vercel.json`
- Setup docs: `SETUP_GUIDE.md`, `PROJECT_SUMMARY.md`, `DISCOVERY_STATUS.md`

---

## Dual Alchemy RPC (HTTP + WebSocket)

### Env variables
- Server: `ALCHEMY_HTTP_URL`, `ALCHEMY_WS_URL`
- Client: `VITE_ALCHEMY_HTTP_URL`, `VITE_ALCHEMY_WS_URL`, `VITE_USE_WEBSOCKET`

### Behavior
- Serverless/API always uses HTTP (enforced on Vercel and in Node).
- Browser can opt-in to WebSocket by setting `VITE_USE_WEBSOCKET=true`.

### Exports (from `lib/config/client.ts`)
- `httpClient`, `wsClient` — preconfigured viem public clients for Base.
- `serverPublicClient` — HTTP client for all serverless/API usage.
- `getPublicClient(opts?)` — browser-side selection helper.
- `getRpcMode()` — returns `HTTP` or `WebSocket`.

```ts
// Server/API
import { serverPublicClient } from "../lib/config/client";

// Browser
import { getPublicClient } from "../lib/config/client";
const client = getPublicClient();
```

---

## Discovery Persistence (resume-safe)

### KV keys
- Progress: `discovery:progress` (legacy summary)
- Detailed state: `discovery:lastBlockScanned` → `{ blockNumber, timestamp, totalTokens, lastBatchDurationMs }`
- Lock: `discovery:lock` (SET NX with TTL ~60–120s)

### Controls (env)
- `DISCOVERY_BATCH_SIZE` (default 1000)
- `DISCOVERY_BATCH_TIMEOUT_MS` (default 15000)
- `DISCOVERY_SLEEP_MS` (default 400)

### Behavior
- Single batch per invocation for serverless safety.
- Each batch enforces timeout and retries and sleeps between batches.
- State is updated after each batch for incremental progress and resume-on-failure.

---

## Enrichment Cache (TTL + sourceDEX)

### KV keys
- `token:<address>:enriched` → `{ data, cachedAt, ttlSecs }`
- Index: `cache:tokens:index` (addresses in cache, used for status counts)

### Controls (env)
- `ENRICH_TTL_SECS` (default 900; 5–15 minute window)

### Payload
- Includes `sourceDEX: "uniswap" | "aerodrome" | "both"`, plus `cachedAt` timestamp for recency.

### Behavior
- Cache-first reads; refreshes on miss/expiry.
- GraphQL and on-chain calls wrapped with simple retries.

---

## Background Refresh Job

### Route
- `POST /api/refresh` (also accepts `GET`)

### Controls (env)
- `REFRESH_LIMIT` (default 50)
- `CRON_SECRET` (optional; required header `x-cron-secret` if set)

### Behavior
- Select top-N tokens (cached trending or fallback to first-N), re-enrich in parallel with `Promise.allSettled`.
- Persists summary to `refresh:lastRun`: `{ timestamp, count, durationMs, successes[], failures[] }`.

### Cron
- `vercel.json` includes: `"crons": [{ "path": "/api/refresh", "schedule": "0 * * * *" }]`.

---

## System Status

### Route
- `GET /api/status`

### Response
```json
{
  "lastBlockScanned": { "blockNumber": 123, "timestamp": "2025-01-01T00:00:00.000Z" },
  "totalTokens": 456,
  "cachedTokens": 321,
  "lastRefresh": { "timestamp": 1700000000000, "count": 50, "durationMs": 12345, "successes": ["0x..."], "failures": [{"address":"0x...","reason":"..."}] },
  "kvUsage": { "keysIndexed": 321, "kvLatencyMs": 5 },
  "rpcMode": "HTTP",
  "rpcLatencyMs": 12
}
```

### Notes
- Includes lightweight RPC latency test (`getBlockNumber`) and current `rpcMode`.

---

## Frontend Hooks (typed + JSDoc)

### `src/hooks/useStatus.ts`
- Returns `{ data, isLoading, isError, refetch }`.
- `data` matches the `/api/status` response with proper TypeScript types and JSDoc.

### `src/hooks/useRefresh.ts`
- Exposes `refresh({ limit?, secret? })` and state `{ isRefreshing, error }`.
- Response contains the refresh summary for UIs to render.

---

## Security
- Discovery can be protected with `DISCOVERY_API_KEY` (optional header `x-api-key`).
- Refresh guarded by `CRON_SECRET` (header: `x-cron-secret`).
- Discovery lock TTL ~60–120s avoids concurrent overlap.

---

## Testing & Verification
1. Local dev: `vercel dev`.
2. Set small `DISCOVERY_BATCH_SIZE=1000`.
3. Trigger discovery: `curl -X POST http://localhost:3000/api/discover -H "Content-Type: application/json" -d '{"incremental": true, "blocksToScan": 1000}'`.
4. Inspect KV keys: `discovery:lastBlockScanned`, token caches `token:<address>:enriched`, and `refresh:lastRun`.
5. Call `/api/tokens` and verify `cachedAt` returned per token.
6. Trigger refresh: `curl -X POST http://localhost:3000/api/refresh -H "x-cron-secret: <your-secret>"`.
7. Open `/api/status` and verify metrics, `rpcMode`, and `rpcLatencyMs`.
8. Toggle `VITE_USE_WEBSOCKET` in the browser; confirm server remains HTTP and client mode toggles.


