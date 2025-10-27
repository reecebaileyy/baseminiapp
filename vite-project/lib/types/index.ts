// Token Types
export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
  isNative?: boolean; // Flag for native ETH (not ERC-20)
}

export interface TokenWithMetrics extends Token {
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  holderCount: number;
  createdAt: number;
  isVerified: boolean;
}

// Liquidity Pool Types
export interface LiquidityPool {
  address: string;
  token0: Token;
  token1: Token;
  fee: number;
  liquidity: string;
  volume24h: number;
  dex: 'uniswap-v3' | 'aerodrome';
  createdAt: number;
}

// Trading Types
export interface QuoteParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippage?: number;
}

export interface SwapQuote {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
  amountOut: string;
  priceImpact: number;
  route: string[];
  gasEstimate: string;
  dex: 'uniswap-v3' | 'aerodrome';
}

export interface SwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOutMin: string;
  slippage: number;
  recipient: string;
  deadline?: number;
}

// Chart Data Types
export interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

export interface ChartData {
  timeframe: '1h' | '24h' | '7d' | '30d';
  data: PricePoint[];
}

// Query Params
export interface TokenQueryParams {
  sort?: 'volume' | 'liquidity' | 'holders' | 'created' | 'marketcap';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  minLiquidity?: number;
  minVolume?: number;
  timeframe?: '1h' | '24h' | '7d';
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

