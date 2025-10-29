# Base Mini App

A decentralized application for interacting with Base network tokens and DEXs.

## Environment Setup

Create a `.env` file in the project root with the following:

```bash
# Alchemy API Configuration
# Get your free API key from: https://www.alchemy.com/
# Make sure to create an app on the Base network
VITE_ALCHEMY_API_KEY=your-alchemy-api-key-here

# Coinbase Developer Platform API Keys (for Buy/Sell functionality)
# Get your API keys from: https://portal.cdp.coinbase.com/
COINBASE_API_KEY_ID=your-coinbase-api-key-id
COINBASE_API_KEY_SECRET=your-coinbase-api-key-secret
```

### Getting Your Coinbase Developer Platform API Keys

For the Buy component to work (fiat onramp), you need to set up API keys from Coinbase Developer Platform:

1. Visit [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Create a new project or select an existing one
3. Go to **API Keys** section
4. Click **Create API key** under "Secret API Keys"
5. Configure your key settings (you can set an IP allowlist for security)
6. Copy the **API Key ID** and **API Key Secret**
7. Add them to your `.env` file (for local development)

**Important for Vercel Deployment:**
- These environment variables must also be set in your Vercel project settings
- Go to your Vercel project → Settings → Environment Variables
- Add `COINBASE_API_KEY_ID` and `COINBASE_API_KEY_SECRET` as environment variables
- These are **server-side only** variables and will be used by the `/api/create-session` serverless function

## Getting Your Alchemy API Key

1. Visit [Alchemy Dashboard](https://dashboard.alchemy.com/) and create a free account
2. Create a new app on the **Base** network
3. Copy your API key from the dashboard
4. Add it to the `.env` file as shown above

For more information, see the [Base API Quickstart](https://www.alchemy.com/docs/reference/base-api-quickstart)

## Important Notes

### Free Tier Limitations
- The app uses a curated list of well-known Base tokens instead of scanning for new tokens
- Token metadata APIs require Alchemy Growth plan ($49/month)
- Wallet token balance tracking requires indexer APIs (Growth plan)
- Regular RPC calls for reading contract data work fine on the free tier

### What Works on Free Tier
✅ Reading token information (name, symbol, decimals) via contract calls  
✅ Getting token balances for specific tokens  
✅ Getting token total supply  
✅ Viewing curated list of known Base tokens  
❌ Fetching ALL tokens in a wallet (requires indexer)  
❌ Real-time new token discovery (requires indexer/pool monitoring)  
❌ Token metadata with logos from Alchemy API  

## Fixes Applied

### 403 Error Resolution
The app was trying to use Alchemy Enhanced APIs (`alchemy_getTokenMetadata`, `alchemy_getTokenBalances`) which:
- Are not available on Base chain free tier
- Return 403 Forbidden errors
- Require Growth plan subscription

**Solution**: The code now:
- Returns a curated list of known Base tokens with static data
- Uses standard contract calls for token information
- Avoids unsupported Alchemy APIs
- Falls back to public Base RPC if Alchemy API key is not configured or returns 403

### 403 Forbidden Errors

If you're getting 403 errors, try one of these solutions:

**Option 1: Use Public RPC (Recommended for Free Tier)**
Remove or empty the `VITE_ALCHEMY_API_KEY` from your `.env` file:
```bash
# .env
# Leave this line commented out or remove it
# VITE_ALCHEMY_API_KEY=
```
The app will automatically use public Base RPC endpoints.

**Option 2: Fix Your Alchemy API Key (Origin Whitelist Issue)**

If you're getting `"Origin localhost is not on whitelist"` error:

1. Go to [Alchemy Dashboard](https://dashboard.alchemy.com/apps)
2. Click on your Base app
3. Go to "Settings" → "Security"
4. **Remove the origin whitelist restrictions** (or add `http://localhost:5173`)
5. Save changes
6. The app will now use your Alchemy API key with better rate limits

**Option 3: Get a Fresh API Key**
1. Go to [Alchemy Dashboard](https://dashboard.alchemy.com/)
2. Create a new app specifically for **Base** network
3. **Important: During setup, don't enable origin whitelist restrictions** (or add `http://localhost:*` for local dev)
4. Copy the API key to your `.env` file
5. Reference: [Base API Quickstart](https://www.alchemy.com/docs/reference/base-api-quickstart)

**Note:** The app currently defaults to using public RPC to avoid origin whitelist issues. Set `useAlchemy = true` in `lib/config/client.ts` after configuring your API key.

## Development

### Install Dependencies
```bash
npm install
```

### Running the Development Server

**Option 1: Using Vite directly (frontend only, API won't work)**
```bash
npm run dev
```
Note: The Buy widget session token generation won't work in this mode since the serverless function isn't running.

**Option 2: Using Vercel CLI (recommended for full functionality)**
```bash
# Install Vercel CLI globally if you haven't already
npm install -g vercel

# Run the dev server with Vercel (this includes serverless functions)
vercel dev
```

This will:
- Start the Vite dev server
- Make the `/api/create-session` serverless function available
- Allow the Buy widget to work properly

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Deploy to production
vercel --prod

# Or push to your connected Git repository - Vercel will auto-deploy
```

**Important:** After deploying to Vercel, make sure to set the `COINBASE_API_KEY_ID` and `COINBASE_API_KEY_SECRET` environment variables in your Vercel project settings for the Buy widget to work.

## Troubleshooting

### Buy Widget Issues

**Error: "Failed to generate session token"**
- Verify your `COINBASE_API_KEY_ID` and `COINBASE_API_KEY_SECRET` are set correctly in Vercel environment variables
- Check that your API keys are active on the Coinbase Developer Platform
- Ensure your API keys have the necessary permissions for Buy/Sell functionality

**Error: "JWT signing failed"**
- The `COINBASE_API_KEY_SECRET` must be in PEM format
- Make sure there are no extra spaces or newlines when copying the secret
- The secret should start with `-----BEGIN` and end with `-----END`

**Buy widget not showing:**
- Ensure you're connected to a wallet
- Check the browser console for any error messages
- Verify the `/api/create-session` endpoint is accessible (try running `vercel dev` for local testing)

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
