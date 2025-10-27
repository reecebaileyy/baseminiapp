This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-onchain`](https://www.npmjs.com/package/create-onchain).


## Getting Started

### Required Environment Variables

Create a `.env.local` file in the `frontend` directory with:

```env
# OnchainKit Configuration
# Get your API key from: https://portal.cdp.coinbase.com/
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here

# Get your Project ID from: https://portal.cdp.coinbase.com/
# REQUIRED for Swap and Buy components
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=your_project_id_here

# Alchemy API Key (optional, for dashboard features)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here
```


## Getting Your Credentials

### 1. OnchainKit API Key & Project ID
1. Go to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Sign in or create an account
3. Create a new project
4. Copy your **API Key** and **Project ID**
5. Add them to `.env.local`

### 2. Alchemy API Key (Optional)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up and create a Base Mainnet app
3. Copy your API key
4. Add it to `.env.local`
First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Learn More

To learn more about OnchainKit, see our [documentation](https://docs.base.org/onchainkit).

To learn more about Next.js, see the [Next.js documentation](https://nextjs.org/docs).
