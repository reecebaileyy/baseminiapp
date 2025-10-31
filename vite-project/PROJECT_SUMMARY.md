# Base Scout Mini App - Project Summary

## Overview
**Base Scout** (also called "Base Mini App") is a Farcaster mini app built for the Base blockchain network. It's a mobile-first token discovery and trading platform that allows users to discover, analyze, and trade ERC-20 tokens on Base. The app is deployed as a Vercel-hosted web application configured as a Farcaster mini app.

## Core Functionality

### 1. Token Discovery System
- **Automatic Token Scanning**: Scans Uniswap V3 and Aerodrome DEX factory events to discover new tokens on Base
- **Incremental Scanning**: Supports incremental block scanning to avoid rescanning entire chain
- **Token Validation**: Validates discovered tokens are valid ERC-20 contracts
- **Storage**: Uses Vercel KV (Redis) to store discovered tokens with metadata
- **Enrichment**: Enriches tokens with on-chain data (price, volume, TVL, market cap) from The Graph subgraphs
- **API Endpoints**:
  - `POST /api/discover` - Manually trigger token discovery
  - `GET /api/tokens/new` - Get newly discovered tokens (last 24 hours)
  - `GET /api/tokens/trending` - Get trending tokens
  - `GET /api/tokens/:address` - Get specific token details

### 2. Token Display & Analytics
- **All Tokens View**: Display all discovered tokens in a sortable, filterable table
- **Trending Tokens**: Show tokens sorted by volume/activity
- **New Tokens**: Display recently discovered tokens
- **Token Detail Pages**: Comprehensive token pages showing:
  - Price charts (hourly/daily data from The Graph)
  - Trading statistics (volume, TVL, market cap)
  - Pool information from Uniswap V3 and Aerodrome
  - Holder count and distribution
  - Honeypot detection
  - Direct swap widget

### 3. Trading Features
- **Swap Functionality**: 
  - Integrated with Uniswap V3 and Aerodrome DEXs on Base
  - Uses 0x Protocol aggregator for best price discovery
  - MEV protection through transaction simulation
  - Supports both full-page swap widget and inline swap widget
- **Buy Widget**: 
  - Coinbase Developer Platform integration for fiat onramp
  - Supports credit card, Apple Pay, and Coinbase account payments
  - Serverless function at `/api/create-session` generates JWT tokens for Coinbase API
  - Direct crypto delivery to user's wallet

### 4. GraphQL Integration
- **The Graph Subgraphs**: 
  - Uniswap V4 Base subgraph (for Uniswap V3 pools and tokens)
  - Aerodrome Base subgraph (for Aerodrome pools)
- **GraphQL Mesh**: Uses GraphQL Mesh to combine multiple subgraphs into unified queries
- **Queries Include**:
  - Token information (symbol, name, decimals, supply)
  - Price data (hourly/daily timeframes)
  - Pool data (liquidity, volume, fees)
  - Historical data for charts

## Technical Stack

### Frontend
- **React 19** with TypeScript
- **Vite** as build tool
- **React Router** for routing
- **@coinbase/onchainkit**: Wallet connection and Base integration
- **wagmi + viem**: Ethereum interaction libraries
- **@tanstack/react-query**: Data fetching and caching
- **CSS Modules**: Component styling

### Backend/API
- **Vercel Serverless Functions**: API routes in `/api` directory
- **Vercel KV**: Redis-compatible database for token storage
- **The Graph API**: Subgraph queries (Uniswap V3, Aerodrome)
- **Alchemy API**: RPC provider for Base network (optional, falls back to public RPC)
- **Coinbase Developer Platform**: Fiat onramp integration

### Blockchain Integration
- **Network**: Base (chain ID 8453)
- **DEXs Supported**: 
  - Uniswap V3 (factory address: `0x33128a8fC17869897dcE68Ed026d694621f6FDfD`)
  - Aerodrome (factory address: `0x420DD381b31aEf6683db6B902084cB0FFECc40B1`)
- **Smart Contract Interaction**: 
  - Reads ERC-20 token data (name, symbol, decimals, supply)
  - Monitors factory events for new pool creation
  - Validates token contracts on-chain

### Data Storage
- **Vercel KV**: Stores discovered token data structure:
  - Token address, name, symbol, decimals
  - Deployment block and timestamp
  - Discoverer address
  - Source DEX (Uniswap V3 or Aerodrome)
  - Last update timestamp
- **Discovery Progress**: Tracks last scanned block number

## Project Structure

```
vite-project/
├── api/                          # Vercel serverless functions
│   ├── create-session.ts         # Coinbase buy widget JWT generation
│   ├── discover.ts               # Token discovery trigger endpoint
│   └── tokens/                   # Token data endpoints
│       ├── [address].ts          # Individual token details
│       ├── new.ts                # New tokens list
│       └── trending.ts           # Trending tokens list
├── lib/
│   ├── api/                      # API client functions
│   │   ├── pools.ts              # Pool data fetching
│   │   ├── tokens.ts             # Token data fetching
│   │   └── trading.ts            # Trading/swap functions
│   ├── config/
│   │   └── client.ts             # viem public client setup
│   ├── constants/
│   │   ├── abis.ts               # Contract ABIs
│   │   └── contracts.ts          # Contract addresses
│   ├── db/
│   │   └── kv.ts                 # Vercel KV database operations
│   ├── graphql/
│   │   └── query.graphql         # GraphQL queries for The Graph
│   ├── services/
│   │   ├── discovery.ts          # Token discovery logic
│   │   ├── enrichment.ts         # Token data enrichment
│   │   ├── graphql-client.ts    # GraphQL client setup
│   │   ├── scanner.ts            # Block scanning utilities
│   │   ├── token.ts              # Token validation
│   │   └── wallet-tokens.ts      # Wallet balance fetching
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── src/
│   ├── components/               # React components
│   │   ├── BuyWidget.tsx         # Coinbase buy widget
│   │   ├── SwapWidget.tsx        # Full-page swap interface
│   │   ├── InlineSwapWidget.tsx  # Inline swap component
│   │   ├── TokenTable.tsx        # Token listing table
│   │   ├── TokenStatsDisplay.tsx # Token statistics display
│   │   ├── NewTokensList.tsx     # New tokens component
│   │   ├── TrendingTokensList.tsx # Trending tokens component
│   │   └── ...
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDiscoveredTokens.ts
│   │   ├── useGraphToken.ts
│   │   ├── usePools.ts
│   │   └── useTrading.ts
│   ├── pages/
│   │   ├── Home.tsx              # Main landing page (token discovery)
│   │   └── ...
│   └── routes/
│       ├── tokens/[address]/     # Token detail pages
│       ├── trade/                # Trading page
│       └── graph/                # Graph/pool visualization
├── public/
│   ├── .well-known/
│   │   └── farcaster.json        # Farcaster mini app manifest
│   ├── icon.png                  # App icon
│   ├── splash.png                # Splash screen
│   └── hero.png                  # Hero image
└── minikit.config.ts             # Base Mini App configuration

```

## Key Features

### Token Discovery
1. Scans block events from DEX factory contracts
2. Extracts token addresses from pool creation events
3. Validates tokens are legitimate ERC-20 contracts
4. Stores in Vercel KV with metadata
5. Enriches with on-chain metrics from The Graph

### User Interface
- **Home Page**: Tabbed interface (All Tokens, Trending, New)
- **Token Details**: Comprehensive token page with stats, charts, pools
- **Trade Page**: Swap and Buy widgets with tab switching
- **Navigation**: Wallet connection, routing between pages

### Wallet Integration
- Supports Coinbase Wallet (via OnchainKit)
- Supports MetaMask and other EIP-1193 wallets
- Auto-connects when embedded in Farcaster
- Shows wallet balance for tokens

### Charting & Analytics
- Price charts using token hourly/daily data from The Graph
- Volume and liquidity metrics
- Pool information and statistics
- Holder count and distribution

## Configuration Files

### Environment Variables Required
- `VITE_ALCHEMY_API_KEY`: Alchemy RPC API key (optional)
- `COINBASE_API_KEY_ID`: Coinbase Developer Platform API key ID
- `COINBASE_API_KEY_SECRET`: Coinbase Developer Platform API key secret (PEM format)
- `VITE_GRAPH_API_KEY`: The Graph API key for subgraph queries
- `KV_REST_API_URL`: Vercel KV REST API URL
- `KV_REST_API_TOKEN`: Vercel KV REST API token
- `DISCOVERY_API_KEY`: Optional API key for protecting discovery endpoint

### Configuration Files
- `.graphclientrc.yml`: GraphQL Mesh configuration for The Graph subgraphs
- `minikit.config.ts`: Base Mini App manifest configuration
- `public/.well-known/farcaster.json`: Farcaster mini app manifest

## Deployment
- **Hosting**: Vercel
- **Domain**: `basescout.vercel.app` (configurable)
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Serverless Functions**: Automatic deployment with Vercel
- **Database**: Vercel KV (auto-configured on Vercel)

## Development Workflow
1. **Local Dev**: `vercel dev` (required for API endpoints)
2. **Token Discovery**: Trigger via `POST /api/discover` endpoint
3. **Frontend Only**: `npm run dev` (but API endpoints won't work)

## Current Status
- ✅ Token discovery system working
- ✅ Token display and filtering
- ✅ Swap functionality integrated
- ✅ Buy widget integrated
- ✅ The Graph integration for price/data
- ✅ Farcaster mini app configuration
- ✅ Wallet connection (OnchainKit)

## Limitations & Notes
- Token discovery requires Vercel KV database
- Free tier Alchemy doesn't support all enhanced APIs
- Token metadata/logo fetching has limitations on free tier
- Discovery process requires manual trigger or cron job
- Uses curated token list as fallback when discovery unavailable

