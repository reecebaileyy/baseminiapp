import { useTokenStats } from '../hooks/useGraphToken';
import styles from './TokenStatsDisplay.module.css';

interface TokenStatsDisplayProps {
  tokenAddress: string;
}

export function TokenStatsDisplay({ tokenAddress }: TokenStatsDisplayProps) {
  const { token, dayData, hourData, isLoading, isError, error } = useTokenStats(tokenAddress, {
    dayDataFirst: 7,
    hourDataFirst: 24,
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

  // Calculate marketcap (price * totalSupply / 10^decimals)
  const marketcap = token.derivedETH && token.totalValueLockedUSD
    ? parseFloat(token.totalValueLockedUSD)
    : null;

  // Get latest day and hour data
  const latestDay = dayData[0];
  const latestHour = hourData[0];

  const formatCurrency = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatNumber = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
            {formatCurrency(token.derivedETH)}
          </div>
          <div className={styles.statSubtext}>ETH</div>
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
            {formatCurrency(latestDay?.volumeUSD || token.volumeUSD)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* 1h Volume */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>1h Volume</div>
          <div className={styles.statValue}>
            {formatCurrency(latestHour?.volumeUSD)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* Total Value Locked */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Value Locked</div>
          <div className={styles.statValue}>
            {formatCurrency(token.totalValueLockedUSD)}
          </div>
          <div className={styles.statSubtext}>USD</div>
        </div>

        {/* Transactions */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Transactions</div>
          <div className={styles.statValue}>
            {formatNumber(token.txCount)}
          </div>
          <div className={styles.statSubtext}>count</div>
        </div>

        {/* Pool Count */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pools</div>
          <div className={styles.statValue}>
            {formatNumber(token.poolCount)}
          </div>
          <div className={styles.statSubtext}>count</div>
        </div>

        {/* Fees USD */}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Fees</div>
          <div className={styles.statValue}>
            {formatCurrency(token.feesUSD)}
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
                  <th>Market Cap (USD)</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
              </thead>
              <tbody>
                {dayData.map((day) => {
                  const date = new Date(day.date * 1000);
                  return (
                    <tr key={day.id}>
                      <td>{date.toLocaleDateString()}</td>
                      <td>{formatCurrency(day.priceUSD)}</td>
                      <td>{formatCurrency(day.volumeUSD)}</td>
                      <td>{formatCurrency(day.totalValueLockedUSD)}</td>
                      <td>{formatCurrency(day.high)}</td>
                      <td>{formatCurrency(day.low)}</td>
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
                  <th>Market Cap (USD)</th>
                  <th>High</th>
                  <th>Low</th>
                </tr>
              </thead>
              <tbody>
                {hourData.slice(0, 24).map((hour) => {
                  const date = new Date(hour.periodStartUnix * 1000);
                  return (
                    <tr key={hour.id}>
                      <td>{date.toLocaleString()}</td>
                      <td>{formatCurrency(hour.priceUSD)}</td>
                      <td>{formatCurrency(hour.volumeUSD)}</td>
                      <td>{formatCurrency(hour.totalValueLockedUSD)}</td>
                      <td>{formatCurrency(hour.high)}</td>
                      <td>{formatCurrency(hour.low)}</td>
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

