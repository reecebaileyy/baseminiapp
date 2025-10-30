import { useTokenStats } from '../hooks/useGraphToken';
import styles from './TokenStatsDisplay.module.css';

interface TokenStatsDisplayProps {
  tokenAddress: string;
}

export function TokenStatsDisplay({ tokenAddress }: TokenStatsDisplayProps) {
  const { token, ethPrice, pools, dayData, hourData, isLoading, isError, error } = useTokenStats(tokenAddress, {
    dayDataFirst: 7,
    hourDataFirst: 48, // Get more hours to ensure we have 24 hours of data
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading token stats...</p>
      </div>
    );
  }

  if (isError || !token) {
    return (
      <div className={styles.error}>
        <h3>Error Loading Stats</h3>
        <p>{error instanceof Error ? error.message : 'Failed to load token statistics'}</p>
      </div>
    );
  }

  // Helper to safely parse BigInt/BigDecimal values (may come as strings or numbers)
  const parseValue = (value: any): number | null => {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'number') return isNaN(value) || !isFinite(value) ? null : value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) || !isFinite(parsed) ? null : parsed;
    }
    // Handle BigInt/BigDecimal objects if they have toString()
    if (value && typeof value.toString === 'function') {
      const parsed = parseFloat(value.toString());
      return isNaN(parsed) || !isFinite(parsed) ? null : parsed;
    }
    return null;
  };

  // Get latest day and hour data
  const latestDay = dayData[0];
  const latestHour = hourData[0];
  
  // Calculate holder count from pools (sum of all liquidity providers)
  const holderCount = pools.reduce((sum: number, pool: any) => {
    const count = parseValue(pool.liquidityProviderCount);
    return sum + (count || 0);
  }, 0);
  
  // TVL - Use token.totalValueLockedUSD directly (aggregated across all pools)
  // This is the most accurate source according to the GraphQL schema
  const tokenTVL = parseValue(token.totalValueLockedUSD) || parseValue(token.totalValueLockedUSDUntracked);
  
  // Fallback: calculate from pools if token TVL is missing
  const tvlFromPools = pools.reduce((sum: number, pool: any) => {
    const tvl = parseValue(pool.totalValueLockedUSD);
    return sum + (tvl || 0);
  }, 0);
  const totalTVL = tokenTVL || tvlFromPools;
  
  // Rolling 24h volume from hourly buckets (UTC-aligned, last completed hours)
  const nowSec = Math.floor(Date.now() / 1000);
  const cutoff = nowSec - 86400;
  const volume24hRolling = hourData.reduce((sum: number, hour: any) => {
    if (!hour || typeof hour.periodStartUnix !== 'number') return sum;
    if (hour.periodStartUnix < cutoff) return sum;
    const tracked = parseValue(hour.volumeUSD) || 0;
    const untracked = parseValue(hour.untrackedVolumeUSD) || 0;
    return sum + tracked + untracked;
  }, 0);

  // Prefer rolling 24h; if empty, fall back to latest day aggregate, then token totals
  const volume24h = volume24hRolling > 0
    ? volume24hRolling
    : ((parseValue(latestDay?.volumeUSD) || 0) + (parseValue(latestDay?.untrackedVolumeUSD) || 0)) ||
      ((parseValue(token.volumeUSD) || 0) + (parseValue(token.untrackedVolumeUSD) || 0));

  // Last 1h = latest completed hour bucket
  const tracked1h = parseValue(latestHour?.volumeUSD) || 0;
  const untracked1h = parseValue(latestHour?.untrackedVolumeUSD) || 0;
  const volume1h = tracked1h + untracked1h;

  // Calculate USD price - try multiple sources with fallbacks
  let currentPriceUSD: number | null = null;
  
  // First try: Use latest day's priceUSD if available and > 0
  const dayPriceUSD = parseValue(latestDay?.priceUSD);
  if (dayPriceUSD && dayPriceUSD > 0) {
    currentPriceUSD = dayPriceUSD;
  }
  // Second try: Calculate from derivedETH * ethPriceUSD
  else {
    const derivedETHNum = parseValue(token.derivedETH);
    const ethPriceNum = parseValue(ethPrice);
    if (derivedETHNum && derivedETHNum > 0 && ethPriceNum && ethPriceNum > 0) {
      currentPriceUSD = derivedETHNum * ethPriceNum;
    }
    // Third try: Calculate price from pools if available
    else if (pools && pools.length > 0 && ethPriceNum && ethPriceNum > 0) {
      // Find pool with WETH/ETH (0x4200000000000000000000000000000000000006 on Base)
      const wethAddress = '0x4200000000000000000000000000000000000006';
      const tokenId = tokenAddress.toLowerCase();
      const wethPool = pools.find((p: any) => {
        const token0Id = p.token0?.id?.toLowerCase();
        const token1Id = p.token1?.id?.toLowerCase();
        return (token0Id === wethAddress && token1Id === tokenId) || 
               (token1Id === wethAddress && token0Id === tokenId);
      });
      
      if (wethPool) {
        const isToken0 = wethPool.token0?.id?.toLowerCase() === tokenId;
        const poolPrice = parseValue(isToken0 ? wethPool.token1Price : wethPool.token0Price);
        if (poolPrice && poolPrice > 0) {
          // token1Price is price of token1 in terms of token0
          // If token is token1 and token0 is WETH, token1Price is token price in WETH
          // If token is token0 and token1 is WETH, token0Price is WETH price in token (inverse)
          if (isToken0) {
            // Token is token0, WETH is token1, so token0Price = amount of token0 per token1 (WETH/token)
            // We need token/WETH, so invert: 1 / token0Price gives us token/WETH
            currentPriceUSD = (1 / poolPrice) * ethPriceNum;
          } else {
            // Token is token1, WETH is token0, so token1Price = amount of token1 per token0 (token/WETH)
            currentPriceUSD = poolPrice * ethPriceNum;
          }
        }
      }
      // If no WETH pool, try USDC pool (price directly in USD)
      if (!currentPriceUSD) {
        const usdcAddress = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'; // Base USDC
        const usdcPool = pools.find((p: any) => {
          const token0Id = p.token0?.id?.toLowerCase();
          const token1Id = p.token1?.id?.toLowerCase();
          return (token0Id === usdcAddress && token1Id === tokenId) || 
                 (token1Id === usdcAddress && token0Id === tokenId);
        });
        
        if (usdcPool) {
          const isToken0 = usdcPool.token0?.id?.toLowerCase() === tokenId;
          const poolPrice = parseValue(isToken0 ? usdcPool.token1Price : usdcPool.token0Price);
          if (poolPrice && poolPrice > 0) {
            // If token is token0, token0Price = USDC/token, we need token/USDC
            // If token is token1, token1Price = token/USDC ≈ token/USD
            if (isToken0) {
              currentPriceUSD = 1 / poolPrice; // Approximate USD (USDC ≈ $1)
            } else {
              currentPriceUSD = poolPrice; // Approximate USD
            }
          }
        }
      }
    }
    // Fourth try: Use close price from latest day if available
    if (!currentPriceUSD) {
      const closePrice = parseValue(latestDay?.close);
      if (closePrice && closePrice > 0) {
        currentPriceUSD = closePrice;
      }
      // Fifth try: Check if we have any day data with price
      else if (dayData.length > 0) {
        const dayWithPrice = dayData.find((d: any) => {
          const price = parseValue(d.priceUSD);
          return price && price > 0;
        });
        if (dayWithPrice) {
          currentPriceUSD = parseValue(dayWithPrice.priceUSD);
        }
      }
    }
  }

  // Calculate marketcap (priceUSD * totalSupply / 10^decimals)
  const totalSupplyNum = parseValue(token.totalSupply);
  const decimalsNum = parseValue(token.decimals);
  const marketcap = currentPriceUSD && totalSupplyNum && decimalsNum && decimalsNum > 0
    ? currentPriceUSD * (totalSupplyNum / Math.pow(10, decimalsNum))
    : null;

  const formatCurrency = (value: string | number | null | undefined) => {
    const num = parseValue(value);
    if (num === null || num === undefined || isNaN(num)) return 'N/A';
    // Handle 0 as a valid value (show $0.00, not N/A)
    if (num === 0) return '$0.00';
    
    // Handle very small numbers (like token prices)
    if (num > 0 && num < 0.01) {
      return `$${num.toExponential(2)}`;
    }
    
    // Determine appropriate decimal places
    let minFractionDigits = 2;
    let maxFractionDigits = 2;
    
    if (num > 0 && num < 1) {
      minFractionDigits = 6;
      maxFractionDigits = 8; // More decimals for small prices (< $1)
    } else if (num >= 1 && num < 1000) {
      minFractionDigits = 2;
      maxFractionDigits = 4; // Moderate decimals for medium prices
    } else if (num >= 1000) {
      minFractionDigits = 0;
      maxFractionDigits = 2; // Fewer decimals for large numbers
    }
    
    // Ensure values are within valid range (0-20) and min <= max
    minFractionDigits = Math.max(0, Math.min(20, minFractionDigits));
    maxFractionDigits = Math.max(minFractionDigits, Math.min(20, maxFractionDigits));
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(num);
  };

  const formatNumber = (value: string | number | null | undefined) => {
    const num = parseValue(value);
    if (num === null || num === undefined || isNaN(num)) return 'N/A';
    // Handle 0 as a valid value (show 0, not N/A)
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // No decimals for counts
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{token.symbol} Statistics</h2>
        <p className={styles.tokenName}>{token.name}</p>
      </div>

      <div className={styles.statsGrid}>
        {/* Current Price */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Current Price</div>
          <div className={styles.statValue}>
            {formatCurrency(currentPriceUSD?.toString())}
          </div>
          <div className={styles.statSubtext}>USD</div>
          {(() => {
            const derivedETHNum = parseValue(token.derivedETH);
            return derivedETHNum && derivedETHNum > 0 ? (
              <div className={styles.statSubtext} style={{ fontSize: '11px', marginTop: '2px' }}>
                {derivedETHNum.toFixed(8)} ETH
              </div>
            ) : null;
          })()}
        </div>

        {/* Market Cap */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Market Cap</div>
          <div className={styles.statValue}>
            {formatCurrency(marketcap?.toString())}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* 24h Volume */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>24h Volume</div>
          <div className={styles.statValue}>
            {formatCurrency(volume24h)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* 1h Volume */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>1h Volume</div>
          <div className={styles.statValue}>
            {formatCurrency(volume1h)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* Total Value Locked */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Value Locked</div>
          <div className={styles.statValue}>
            {formatCurrency(totalTVL)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* Transactions */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Transactions</div>
          <div className={styles.statValue}>
            {formatNumber(parseValue(token.txCount))}
          </div>
          <div className={styles.statSubtext}>count</div>
        </div>

        {/* Pool Count */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pools</div>
          <div className={styles.statValue}>
            {formatNumber(parseValue(token.poolCount))}
          </div>
          <div className={styles.statSubtext}>count</div>
        </div>

        {/* Holder Count */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Holders</div>
          <div className={styles.statValue}>
            {formatNumber(holderCount || 0)}
          </div>
          <div className={styles.statSubtext}>count</div>
        </div>

        {/* Fees USD */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Fees</div>
          <div className={styles.statValue}>
            {formatCurrency(parseValue(token.feesUSD))}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>
      </div>

      {/* Day Data Table */}
      {dayData.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Daily Statistics (Last 7 Days)</h3>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price (USD)</th>
                  <th>Volume (USD)</th>
                  <th>TVL (USD)</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
              </thead>
              <tbody>
                {dayData.map((day: any) => {
                  const date = new Date(day.date * 1000);
                  return (
                    <tr key={day.id}>
                      <td>{date.toLocaleDateString()}</td>
                      <td>{formatCurrency(parseValue(day.priceUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(day.volumeUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(day.totalValueLockedUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(day.high) || null)}</td>
                      <td>{formatCurrency(parseValue(day.low) || null)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hour Data Table */}
      {hourData.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Hourly Statistics (Last 24 Hours)</h3>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price (USD)</th>
                  <th>Volume (USD)</th>
                  <th>TVL (USD)</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
              </thead>
              <tbody>
                {hourData.slice(0, 24).map((hour: any) => {
                  const date = new Date(hour.periodStartUnix * 1000);
                  return (
                    <tr key={hour.id}>
                      <td>{date.toLocaleString()}</td>
                      <td>{formatCurrency(parseValue(hour.priceUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(hour.volumeUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(hour.totalValueLockedUSD) || null)}</td>
                      <td>{formatCurrency(parseValue(hour.high) || null)}</td>
                      <td>{formatCurrency(parseValue(hour.low) || null)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

