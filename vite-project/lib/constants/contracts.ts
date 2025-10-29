// Base Chain Contract Addresses

// Uniswap V3 on Base
export const UNISWAP_V3_ADDRESSES = {
  FACTORY: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  ROUTER: '0x2626664c2603336E57B271c5C0b26F421741e481',
  QUOTER: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  POSITION_MANAGER: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
} as const;

// Aerodrome on Base
export const AERODROME_ADDRESSES = {
  FACTORY: '0x420DD381b31aEf6683db6B902084cB0FFECe40Da',
  ROUTER: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
} as const;

// BaseSwap on Base
export const BASESWAP_ADDRESSES = {
  FACTORY: '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB',
  ROUTER: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
} as const;

// Common Token Addresses on Base
export const TOKEN_ADDRESSES = {
  ETH: '0x0000000000000000000000000000000000000000', // Native ETH (special address)
  WETH: '0x4200000000000000000000000000000000000006',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  USDbC: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // Bridged USDC
  DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
} as const;

// Common Token List
export const COMMON_TOKENS = [
  {
    address: TOKEN_ADDRESSES.ETH,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.png',
    isNative: true, // Flag for native ETH
  },
  {
    address: TOKEN_ADDRESSES.WETH,
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/WETH/logo.png',
  },
  {
    address: TOKEN_ADDRESSES.USDC,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
  },
  {
    address: TOKEN_ADDRESSES.USDbC,
    name: 'USD Base Coin',
    symbol: 'USDbC',
    decimals: 6,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
  },
  {
    address: TOKEN_ADDRESSES.DAI,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    chainId: 8453,
    logoURI: 'https://ethereum-optimism.github.io/data/DAI/logo.png',
  },
] as const;

// Fee Tiers for Uniswap V3
export const UNISWAP_V3_FEE_TIERS = {
  LOWEST: 100, // 0.01%
  LOW: 500, // 0.05%
  MEDIUM: 3000, // 0.3%
  HIGH: 10000, // 1%
} as const;

