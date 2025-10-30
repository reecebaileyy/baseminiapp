import { useTrendingTokens } from '../hooks/useDiscoveredTokens';
import { useTokenFormatter } from '../hooks/useTokenFormatter';
import { getTokenLogoUrl } from 'lib/utils/tokenLogos';
import { Link } from 'react-router-dom';
import styles from './TrendingTokensList.module.css';

interface TrendingTokensListProps {
  limit?: number;
}

export function TrendingTokensList({ limit = 10 }: TrendingTokensListProps) {
  const { data: tokens, isLoading, error, refetch, isFetching } = useTrendingTokens();
  const { formatCurrency } = useTokenFormatter();

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading trending tokens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h3>Error Loading Tokens</h3>
        <p>{error instanceof Error ? error.message : 'Failed to load tokens'}</p>
      </div>
    );
  }


  if (!tokens || tokens.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No trending tokens found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Trending Tokens</h2>
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className={styles.refreshButton}
          title="Refresh trending tokens"
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
      <div className={styles.tokensGrid}>
        {tokens.slice(0, limit).map((token, index) => (
          <Link key={token.address} to={`/tokens/${token.address}`} className={styles.tokenCard}>
            <div className={styles.rank}>#{index + 1}</div>
            
            <div className={styles.tokenHeader}>
              <div className={styles.tokenIcon}>
                <img 
                  src={getTokenLogoUrl(token.address, 8453)} 
                  alt={token.symbol} 
                  width={48} 
                  height={48}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholder} style={{ display: 'none' }}>{token.symbol[0]}</div>
              </div>
              <div className={styles.tokenInfo}>
                <div className={styles.tokenName}>{token.name}</div>
                <div className={styles.tokenSymbol}>{token.symbol}</div>
              </div>
            </div>

            <div className={styles.price}>
              <span className={styles.priceValue}>
                {token.priceUSD ? formatCurrency(token.priceUSD) : 'N/A'}
              </span>
            </div>

            <div className={styles.tokenMetrics}>
              <div className={styles.metric} title="24h trading volume from DEXs">
                <span className={styles.metricLabel}>Volume 24h:</span>
                <span className={styles.metricValue}>{token.volume24h > 0 ? formatCurrency(token.volume24h) : 'N/A'}</span>
              </div>

              <div className={styles.metric} title="Total Value Locked in USD">
                <span className={styles.metricLabel}>TVL:</span>
                <span className={styles.metricValue}>{token.tvlUSD > 0 ? formatCurrency(token.tvlUSD) : 'N/A'}</span>
              </div>

              <div className={styles.metric} title="Market capitalization">
                <span className={styles.metricLabel}>Market Cap:</span>
                <span className={styles.metricValue}>
                  {token.marketCap ? formatCurrency(token.marketCap) : 'N/A'}
                </span>
              </div>

              <div className={styles.metric} title="Number of token holders">
                <span className={styles.metricLabel}>Holders:</span>
                <span className={styles.metricValue}>{token.holderCount.toLocaleString()}</span>
              </div>
            </div>

            <div className={styles.tokenAddress}>
              <span className={styles.addressValue}>{token.address}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

