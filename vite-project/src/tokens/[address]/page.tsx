import { useParams, Link } from 'react-router-dom';
import { useTokenDetails, useHoneypotCheck } from '../../hooks/useTokens';
import { useTokenPools } from '../../hooks/usePools';
import { Wallet } from '@coinbase/onchainkit/wallet';
import { Navigation } from '../../components/Navigation';
import { InlineSwapWidget } from '../../components/InlineSwapWidget';
import styles from './page.module.css';

export default function TokenDetails() {
  const { address } = useParams<{ address: string }>();
  const { data: token, isLoading, error } = useTokenDetails(address);
  const { data: honeypot } = useHoneypotCheck(address);
  const { data: pools } = useTokenPools(address);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Navigation />
          <Wallet />
        </header>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading token details...</p>
        </div>
      </div>
    );
  }

  if (error || !token || !address) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Navigation />
          <Wallet />
        </header>
        <div className={styles.error}>
          <h2>Token not found</h2>
          <Link to="/graph">Back to Scanner</Link>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navigation />
        <Wallet />
      </header>

      <div className={styles.content}>
        <div className={styles.tokenHeader}>
          <div className={styles.tokenIcon}>
            {token.logoURI ? (
              <img src={token.logoURI} alt={token.symbol} width={64} height={64} />
            ) : (
              <div className={styles.placeholder}>{token.symbol[0]}</div>
            )}
          </div>
          <div>
            <h1 className={styles.tokenName}>{token.name}</h1>
            <div className={styles.tokenSymbol}>{token.symbol}</div>
            <div className={styles.tokenAddress}>
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          </div>
        </div>

        {honeypot && honeypot.isHoneypot && (
          <div className={styles.warning}>
            <strong>⚠️ Warning:</strong> This token may be a honeypot
            <ul>
              {honeypot.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Price</div>
            <div className={styles.statValue}>
              {token.price > 0 ? `$${token.price.toFixed(6)}` : 'N/A'}
            </div>
            <div className={token.priceChange24h >= 0 ? styles.positive : styles.negative}>
              {token.priceChange24h >= 0 ? '+' : ''}
              {token.priceChange24h.toFixed(2)}% (24h)
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Market Cap</div>
            <div className={styles.statValue}>{formatNumber(token.marketCap)}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Volume (24h)</div>
            <div className={styles.statValue}>{formatNumber(token.volume24h)}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Liquidity</div>
            <div className={styles.statValue}>{formatNumber(token.liquidity)}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Holders</div>
            <div className={styles.statValue}>{token.holderCount.toLocaleString()}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Verified</div>
            <div className={styles.statValue}>
              {token.isVerified ? '✓' : '✗'}
            </div>
          </div>
        </div>

        <div className={styles.pools}>
          <h2>Liquidity Pools</h2>
          {pools && pools.length > 0 ? (
            <div className={styles.poolsList}>
              {pools.map((pool, i) => (
                <div key={i} className={styles.poolItem}>
                  <div>Pool #{i + 1}</div>
                  <div className={styles.poolAddress}>
                    {pool.slice(0, 10)}...{pool.slice(-8)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noPools}>No liquidity pools found</p>
          )}
        </div>

        {/* Inline Swap Widget */}
        <InlineSwapWidget targetToken={token} />

        <div className={styles.actions}>
          <a
            href={`https://basescan.org/token/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.explorerBtn}
          >
            View on BaseScan
          </a>
          <Link to={`/trade?token=${address}`} className={styles.tradeBtn}>
            View Full Trade Page
          </Link>
        </div>

        
      </div>
    </div>
  );
}

