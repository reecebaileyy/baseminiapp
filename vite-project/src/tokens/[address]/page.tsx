import { useParams, Link } from 'react-router-dom';
import { useTokenDetails } from '../../hooks/useDiscoveredTokens';
import { useHoneypotCheck } from '../../hooks/useTokens';
import { useTokenPools } from '../../hooks/usePools';
import { Wallet } from '@coinbase/onchainkit/wallet';
import { Navigation } from '../../components/Navigation';
import { InlineSwapWidget } from '../../components/InlineSwapWidget';
import { useTokenFormatter } from '../../hooks/useTokenFormatter';
import { getTokenLogoUrl } from 'lib/utils/tokenLogos';
import type { TokenWithMetrics } from 'lib/types';
import styles from './page.module.css';

export default function TokenDetails() {
  const { address } = useParams<{ address: string }>();
  const { data: token, isLoading, error } = useTokenDetails(address);
  const { data: honeypot } = useHoneypotCheck(address);
  const { data: pools } = useTokenPools(address);
  const { formatCurrency } = useTokenFormatter();

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
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Map EnrichedToken to display properties
  const price = token.priceUSD || 0;
  const marketCap = token.marketCap || 0;
  const volume24h = token.volume24h || 0;
  const liquidity = token.tvlUSD || 0;
  const holderCount = typeof token.holderCount === 'number' ? token.holderCount : Number(token.holderCount);

  // Convert EnrichedToken to TokenWithMetrics for InlineSwapWidget
  const tokenForWidget: TokenWithMetrics = {
    address: token.address,
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    chainId: 8453,
    logoURI: getTokenLogoUrl(address, 8453),
    price: price,
    priceChange24h: 0, // Not available in EnrichedToken
    volume24h: volume24h,
    liquidity: liquidity,
    marketCap: marketCap,
    holderCount: holderCount,
    createdAt: token.createdAtTimestamp,
    isVerified: token.isListed,
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
            <img 
              src={getTokenLogoUrl(address, 8453)} 
              alt={token.symbol} 
              width={64} 
              height={64}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className={styles.placeholder} style={{ display: 'none' }}>{token.symbol[0]}</div>
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

         {/* Inline Swap Widget */}
         <InlineSwapWidget targetToken={tokenForWidget} />
        
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Price</div>
            <div className={styles.statValue}>
              {price > 0 ? `$${price.toFixed(6)}` : 'N/A'}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Market Cap</div>
            <div className={styles.statValue}>{marketCap > 0 ? formatCurrency(marketCap) : 'N/A'}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Volume (24h)</div>
            <div className={styles.statValue}>{volume24h > 0 ? formatCurrency(volume24h) : 'N/A'}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Liquidity (TVL)</div>
            <div className={styles.statValue}>{liquidity > 0 ? formatCurrency(liquidity) : 'N/A'}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Holders</div>
            <div className={styles.statValue}>{holderCount > 0 ? holderCount.toLocaleString() : 'N/A'}</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Status</div>
            <div className={styles.statValue}>
              {token.isListed ? '✓ Listed' : 'Unlisted'}
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

