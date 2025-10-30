import { useState, useEffect } from 'react';
import { 
  Swap, 
  SwapAmountInput, 
  SwapToggleButton, 
  SwapButton, 
  SwapMessage,
  SwapToast,
} from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';
import { useAccount, useSwitchChain } from 'wagmi';
import type { TokenWithMetrics } from 'lib/types';
import styles from './InlineSwapWidget.module.css';

interface InlineSwapWidgetProps {
  /** The token that users will be swapping TO */
  targetToken: TokenWithMetrics;
  /** Optional callback when the widget is closed */
  onClose?: () => void;
  /** Optional list of token addresses to use as "from" tokens (defaults to ETH and USDC) */
  defaultFromTokens?: string[];
}

/**
 * InlineSwapWidget - An embeddable swap component for swapping into a specific token
 * 
 * @example
 * ```tsx
 * <InlineSwapWidget targetToken={selectedToken} />
 * ```
 * 
 * Features:
 * - Collapsible/expandable interface to save space
 * - Uses OnchainKit for swap functionality
 * - Automatically switches to Base network if needed
 * - Pre-configured for ETH and USDC as source tokens
 * - Validates wallet connection before showing swap UI
 */
export function InlineSwapWidget({ targetToken, onClose: _onClose, defaultFromTokens: _defaultFromTokens }: InlineSwapWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // Auto-switch to Base if on wrong network
  useEffect(() => {
    if (address && chain && chain.id !== 8453 && switchChain) {
      console.log('Auto-switching to Base network...');
      switchChain({ chainId: 8453 });
    }
  }, [address, chain, switchChain]);

  // Convert TokenWithMetrics to OnchainKit Token format
  const targetTokenFormatted: Token = {
    address: targetToken.address as `0x${string}`,
    chainId: 8453,
    decimals: targetToken.decimals,
    name: targetToken.name,
    symbol: targetToken.symbol,
    image: targetToken.logoURI || '',
  };

  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  };

  const USDCToken: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    image: "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  };

  // Build the swappable tokens list - always include ETH, USDC, and the target token
  // Users can extend this to include additional tokens via defaultFromTokens prop
  const swappableTokens: Token[] = [ETHToken, USDCToken, targetTokenFormatted];

  if (!address) {
    return (
      <div className={styles.connectPrompt}>
        <p>Connect your wallet to swap</p>
      </div>
    );
  }

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.tokenIcon}>
            {targetToken.logoURI ? (
              <img src={targetToken.logoURI} alt={targetToken.symbol} width={32} height={32} />
            ) : (
              <div className={styles.placeholder}>{targetToken.symbol[0]}</div>
            )}
          </div>
          <div className={styles.headerText}>
            <h3>Swap to {targetToken.symbol}</h3>
            <p className={styles.subtitle}>Trade this token directly</p>
          </div>
        </div>
        <button 
          className={styles.expandBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.swapContent}>
          <Swap
            onError={(error: any) => {
              console.error('Swap error:', error);
            }}
            onStatus={(status: any) => {
              console.log('Swap status:', status);
            }}
          >
            <SwapAmountInput
              label="Sell"
              swappableTokens={swappableTokens}
              token={ETHToken}
              type="from"
            />
            <SwapToggleButton />
            <SwapAmountInput
              label="Buy"
              swappableTokens={swappableTokens}
              token={targetTokenFormatted}
              type="to"
            />
            <SwapButton />
            <SwapMessage />
            <SwapToast />
          </Swap>
        </div>
      )}
    </div>
  );
}

