# Base Mini App

A decentralized application for interacting with Base network tokens and DEXs.

## Environment Setup

Create a `.env` file in the project root with the following:

```bash
# Alchemy API Configuration
# Get your free API key from: https://www.alchemy.com/
# Make sure to create an app on the Base network
VITE_ALCHEMY_API_KEY=your-alchemy-api-key-here
```

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

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

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
