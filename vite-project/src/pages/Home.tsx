import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { Navigation } from "../components/Navigation";
import { TokenTable } from "../components/TokenTable";
import { NewTokensList } from "../components/NewTokensList";
import { TrendingTokensList } from "../components/TrendingTokensList";
import styles from "./Home.module.css";

type TabType = 'all' | 'trending' | 'new';

export default function Home() {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Token Discovery Platform</h1>
          <p className={styles.subtitle}>
            Discover all ERC-20 tokens on Base network with real-time metrics from Uniswap V3 and Aerodrome
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Tokens
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'trending' ? styles.active : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            Trending
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'new' ? styles.active : ''}`}
            onClick={() => setActiveTab('new')}
          >
            New Tokens
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'all' && (
            <div className={styles.section}>
              <TokenTable filter="all" limit={100} />
            </div>
          )}

          {activeTab === 'trending' && (
            <div className={styles.section}>
              <TrendingTokensList />
            </div>
          )}

          {activeTab === 'new' && (
            <div className={styles.section}>
              <NewTokensList limit={50} />
            </div>
          )}
        </div>

        <div className={styles.footerLinks}>
          <Link to="/graph" className={styles.link}>
            New Pools Scanner
          </Link>
          <Link to="/trade" className={styles.link}>
            Trade Tokens
          </Link>
        </div>
      </div>
    </div>
  );
}

