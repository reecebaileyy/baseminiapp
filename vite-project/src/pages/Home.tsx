import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { Navigation } from "../components/Navigation";
import styles from "./Home.module.css";

export default function Home() {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Base Trading Platform</h1>
          <p className={styles.subtitle}>
            Discover and trade new tokens instantly with real-time scanning and MEV protection
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Token Scanner</h3>
              <p>Real-time detection of new token launches on Base</p>
              <Link to="/graph" className={styles.featureBtn}>
                Open Scanner
              </Link>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>💱</div>
              <h3>Smart Trading</h3>
              <p>Best prices across Uniswap V3 and Aerodrome DEXs</p>
              <Link to="/trade" className={styles.featureBtn}>
                Start Trading
              </Link>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>MEV Protection</h3>
              <p>Simulate transactions before execution to prevent frontrunning</p>
              <Link to="/trade" className={styles.featureBtn}>
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>2+</div>
              <div className={styles.statLabel}>DEX Integrations</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>Base</div>
              <div className={styles.statLabel}>Network</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>0%</div>
              <div className={styles.statLabel}>Platform Fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

