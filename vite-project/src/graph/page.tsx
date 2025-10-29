import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { TokenSearch } from '../components/TokenSearch';
import { TokenStatsDisplay } from '../components/TokenStatsDisplay';
import { NewPoolsList } from '../components/NewPoolsList';
import styles from './page.module.css';

export default function GraphPage() {
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string | null>(null);

  const handleTokenSelect = (tokenAddress: string) => {
    setSelectedTokenAddress(tokenAddress);
  };

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Graph Analytics</h1>
        <p className={styles.subtitle}>
          Search tokens and explore new pools from Uniswap V4 Base subgraph
        </p>
      </div>

      <div className={styles.content}>
        {/* Token Search Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Search Token</h2>
          <TokenSearch onTokenSelect={handleTokenSelect} />
        </div>

        {/* Token Stats Section */}
        {selectedTokenAddress && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Token Statistics</h2>
            <TokenStatsDisplay tokenAddress={selectedTokenAddress} />
          </div>
        )}

        {/* New Pools Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>New Pools</h2>
          <NewPoolsList limit={20} />
        </div>
      </div>
    </div>
  );
}
