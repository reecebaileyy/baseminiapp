import { useNewPools } from '../hooks/useGraphPools';
import styles from './NewPoolsList.module.css';

interface NewPoolsListProps {
  limit?: number;
}

export function NewPoolsList({ limit = 20 }: NewPoolsListProps) {
  const { data: pools, isLoading, isError, error, refetch, isFetching } = useNewPools({
    first: limit,
    orderBy: 'createdAtTimestamp',
    orderDirection: 'desc',
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading new pools...</p>
      </div>
    );
  }

  if (isError || !pools) {
    return (
      <div className={styles.error}>
        <h3>Error Loading Pools</h3>
        <p>{error instanceof Error ? error.message : 'Failed to load pools'}</p>
      </div>
    );
  }

  const formatCurrency = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
  };

  const formatPercentage = (value: string | null | undefined) => {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
    return `${(num / 10000).toFixed(2)}%`;
  };

  if (pools.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No pools found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Newly Created Pools</h2>
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className={styles.refreshButton}
          title="Refresh pools list"
        >
          <svg
            className={styles.refreshIcon}
            style={{ animation: isFetching ? 'spin 1s linear infinite' : 'none' }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className={styles.poolsGrid}>
        {pools.map((pool: any) => {
          const latestDay = pool.poolDayData?.[0];
          
          return (
            <div key={pool.id} className={styles.poolCard}>
              <div className={styles.poolHeader}>
                <div className={styles.tokenPair}>
                  <span className={styles.tokenSymbol}>
                    {pool.token0?.symbol || 'Unknown'}
                  </span>
                  <span className={styles.tokenSeparator}>/</span>
                  <span className={styles.tokenSymbol}>
                    {pool.token1?.symbol || 'Unknown'}
                  </span>
                </div>
                <div className={styles.feeTier}>
                  Fee: {formatPercentage(pool.feeTier)}
                </div>
              </div>

              <div className={styles.poolInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Created:</span>
                  <span className={styles.infoValue}>
                    {formatDate(pool.createdAtTimestamp)}
                  </span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Block:</span>
                  <span className={styles.infoValue}>
                    {pool.createdAtBlockNumber || 'N/A'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>TVL:</span>
                  <span className={styles.infoValue}>
                    {formatCurrency(pool.totalValueLockedUSD)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>24h Volume:</span>
                  <span className={styles.infoValue}>
                    {formatCurrency(latestDay?.volumeUSD || pool.volumeUSD)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>24h Fees:</span>
                  <span className={styles.infoValue}>
                    {formatCurrency(latestDay?.feesUSD || pool.feesUSD)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>TX Count:</span>
                  <span className={styles.infoValue}>
                    {pool.txCount || '0'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Liquidity Providers:</span>
                  <span className={styles.infoValue}>
                    {pool.liquidityProviderCount || '0'}
                  </span>
                </div>
              </div>

              <div className={styles.poolAddress}>
                <span className={styles.addressLabel}>Pool ID:</span>
                <span className={styles.addressValue}>{pool.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

