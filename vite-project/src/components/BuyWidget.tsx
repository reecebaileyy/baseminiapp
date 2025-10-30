import { useState, useEffect } from 'react';
import { Buy } from '@coinbase/onchainkit/buy';
import type { Token } from '@coinbase/onchainkit/token';
import { useAccount } from 'wagmi';
import styles from './BuyWidget.module.css';

export function BuyWidget() {
  const { address, isConnected } = useAccount();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // Wrapped ETH on Base - actual ERC-20 token
  const ETHToken: Token = {
    name: "Ethereum",
    address: "",
    symbol: "ETH",
    decimals: 18,
    image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    chainId: 8453,
  };

  // Fetch session token when wallet is connected
  useEffect(() => {
    const fetchSessionToken = async () => {
      if (!isConnected || !address) {
        return;
      }

      setIsLoadingSession(true);
      setSessionError(null);

      try {
        // Use the current origin to ensure we hit the correct server
        const response = await fetch(`${window.location.origin}/api/create-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            addresses: [
              {
                address: address,
                blockchains: ['base', 'ethereum'],
              },
            ],
            assets: ['ETH', 'USDC'],
          }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Serverless function not running. Please run: vercel dev');
          }
          const data = await response.json();
          throw new Error(data.error || 'Failed to generate session token');
        }

        const data = await response.json();

        setSessionToken(data.token);
      } catch (error) {
        console.error('Error fetching session token:', error);
        if (error instanceof SyntaxError) {
          setSessionError('Invalid response from server. Make sure you are running "vercel dev" instead of "npm run dev"');
        } else {
          setSessionError(error instanceof Error ? error.message : 'Failed to load buy widget');
        }
      } finally {
        setIsLoadingSession(false);
      }
    };

    fetchSessionToken();
  }, [isConnected, address]);

  // Show loading state
  if (isLoadingSession) {
    return (
      <div className={styles.buyWrapper}>
        <p>Loading buy widget...</p>
      </div>
    );
  }

  // Show error state
  if (sessionError) {
    return (
      <div className={styles.buyWrapper}>
        <p>Error: {sessionError}</p>
      </div>
    );
  }

  // Show message if wallet not connected
  if (!isConnected) {
    return (
      <div className={styles.buyWrapper}>
        <p>Connect your wallet to buy crypto</p>
      </div>
    );
  }

  return (
    <div className={styles.buyWrapper}>
      <Buy 
        toToken={ETHToken}
        onError={(error: any) => {
          console.error('Buy error details:', error);
          console.error('Error object keys:', Object.keys(error || {}));
          console.error('Error stringified:', JSON.stringify(error, null, 2));
        }}
        onStatus={(status: any) => {
          console.log('Buy status:', status);
        }}
        onSuccess={(receipt: any) => {
          console.log('Buy success:', receipt);
        }}
        {...(sessionToken && { sessionToken })}
      />
    </div>
  );
}
