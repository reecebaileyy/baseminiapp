'use client';

import { useState } from 'react';
import { useTrendingTokens } from '../hooks/useTokens';
import { usePoolWatcher } from '../hooks/usePools';
import { TokenTable } from '../components/TokenTable';
import { Navigation } from '../components/Navigation';
import styles from './page.module.css';

export default function Dashboard() {
  const [limit, setLimit] = useState(50);
  const { data: trendingTokens, isLoading, error, refetch } = useTrendingTokens(limit);
  const { newPools } = usePoolWatcher();

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Token Scanner</h1>
        <p className={styles.subtitle}>
          Real-time token discovery on Base chain
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>ℹ️</div>
          <div>
            <strong>Free Tier Mode:</strong> Showing well-known Base tokens. 
            For real-time new token scanning, upgrade to Alchemy&apos;s paid plan to unlock full scanning capabilities.
          </div>
        </div>

        {newPools.length > 0 && (
          <div className={styles.notification}>
            <div className={styles.notificationIcon}>🆕</div>
            <div>
              <strong>{newPools.length} new pool(s) detected!</strong>
              <span> Click to view recent launches</span>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${limit === 20 ? styles.active : ''}`}
              onClick={() => setLimit(20)}
            >
              Top 20
            </button>
            <button
              className={`${styles.filterBtn} ${limit === 50 ? styles.active : ''}`}
              onClick={() => setLimit(50)}
            >
              Top 50
            </button>
            <button
              className={`${styles.filterBtn} ${limit === 100 ? styles.active : ''}`}
              onClick={() => setLimit(100)}
            >
              Top 100
            </button>
          </div>

          <button className={styles.refreshBtn} onClick={() => refetch()}>
            ↻ Refresh
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            <p>Failed to load tokens. Please try again.</p>
            <button onClick={() => refetch()}>Retry</button>
          </div>
        )}

        {trendingTokens && (
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Tokens Found</div>
              <div className={styles.statValue}>{trendingTokens.length}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>New Pools</div>
              <div className={styles.statValue}>{newPools.length}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total Liquidity</div>
              <div className={styles.statValue}>
                ${(trendingTokens.reduce((sum, t) => sum + t.liquidity, 0) / 1000000).toFixed(2)}M
              </div>
            </div>
          </div>
        )}

        <TokenTable tokens={trendingTokens || []} isLoading={isLoading} />
      </div>
    </div>
  );
}

