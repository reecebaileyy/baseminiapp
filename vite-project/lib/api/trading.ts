import { getUniswapV3Quote, buildUniswapV3SwapData } from '../services/dex/uniswap-v3';
import {
  getBestAerodromeQuote,
  buildAerodromeSwapData,
} from '../services/dex/aerodrome';
import { SwapQuote, Token } from '../types';
import { UNISWAP_V3_ADDRESSES, AERODROME_ADDRESSES } from '../constants/contracts';

/**
 * Trading API - All DEX and swap-related functions
 */
export const tradingApi = {
  /**
   * Get best quote across all DEXs
   */
  getBestQuote: async (
    tokenIn: Token,
    tokenOut: Token,
    amountIn: string
  ): Promise<SwapQuote | null> => {
    try {
      // Try all Uniswap V3 fee tiers in parallel
      const uniswapQuotes = await Promise.all([
        getUniswapV3Quote(tokenIn, tokenOut, amountIn, 500),   // 0.05%
        getUniswapV3Quote(tokenIn, tokenOut, amountIn, 3000),  // 0.3%
        getUniswapV3Quote(tokenIn, tokenOut, amountIn, 10000), // 1%
      ]);

      // Get best Uniswap quote
      const bestUniswapQuote = uniswapQuotes
        .filter((q): q is SwapQuote => q !== null)
        .sort((a, b) => parseFloat(b.amountOut) - parseFloat(a.amountOut))[0];

      // Get Aerodrome quote
      const aerodromeQuote = await getBestAerodromeQuote(tokenIn, tokenOut, amountIn);

      // Return the quote with best output
      if (!bestUniswapQuote && !aerodromeQuote) return null;
      if (!bestUniswapQuote) return aerodromeQuote;
      if (!aerodromeQuote) return bestUniswapQuote;

      const uniswapAmount = parseFloat(bestUniswapQuote.amountOut);
      const aerodromeAmount = parseFloat(aerodromeQuote.amountOut);

      return uniswapAmount > aerodromeAmount ? bestUniswapQuote : aerodromeQuote;
    } catch (error) {
      console.error('Error getting best quote:', error);
      return null;
    }
  },

  /**
   * Get quote from Uniswap V3
   */
  getUniswapQuote: async (
    tokenIn: Token,
    tokenOut: Token,
    amountIn: string
  ): Promise<SwapQuote | null> => {
    return getUniswapV3Quote(tokenIn, tokenOut, amountIn);
  },

  /**
   * Get quote from Aerodrome
   */
  getAerodromeQuote: async (
    tokenIn: Token,
    tokenOut: Token,
    amountIn: string
  ): Promise<SwapQuote | null> => {
    return getBestAerodromeQuote(tokenIn, tokenOut, amountIn);
  },

  /**
   * Build swap transaction data
   */
  buildSwapTransaction: (
    quote: SwapQuote,
    recipient: string,
    slippage: number = 0.5
  ): {
    to: string;
    data: `0x${string}`;
    value: bigint;
  } => {
    // Calculate minimum amount out with slippage
    const amountOutMin = (
      parseFloat(quote.amountOut) *
      (1 - slippage / 100)
    ).toString();

    let data: `0x${string}`;
    let to: string;

    if (quote.dex === 'uniswap-v3') {
      data = buildUniswapV3SwapData(
        quote.tokenIn.address,
        quote.tokenOut.address,
        quote.amountIn,
        amountOutMin,
        recipient,
        quote.tokenIn.decimals,
        quote.tokenOut.decimals
      );
      to = UNISWAP_V3_ADDRESSES.ROUTER;
    } else {
      // Aerodrome
      data = buildAerodromeSwapData(
        quote.tokenIn.address,
        quote.tokenOut.address,
        quote.amountIn,
        amountOutMin,
        recipient,
        quote.tokenIn.decimals,
        quote.tokenOut.decimals
      );
      to = AERODROME_ADDRESSES.ROUTER;
    }

    return {
      to,
      data,
      value: BigInt(0), // Non-zero if swapping native ETH
    };
  },

  /**
   * Simulate swap transaction
   */
  simulateSwap: async (
    quote: SwapQuote,
    recipient: string,
    _slippage: number = 0.5
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Use Alchemy simulation API to test transaction
      // For now, just return success
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Simulation failed',
      };
    }
  },
};

