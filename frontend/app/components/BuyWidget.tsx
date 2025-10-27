'use client';

import { useEffect } from 'react';
import { Buy } from '@coinbase/onchainkit/buy';
import type { Token } from '@coinbase/onchainkit/token';
import { useAccount, useSwitchChain } from 'wagmi';

export function BuyWidget() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // Auto-switch to Base if on wrong network
  useEffect(() => {
    if (address && chain && chain.id !== 8453 && switchChain) {
      console.log('Auto-switching to Base network...');
      switchChain({ chainId: 8453 });
    }
  }, [address, chain, switchChain]);

  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  };

  return (
    <Buy 
      toToken={ETHToken}
      onError={(error) => {
        console.error('Buy error details:', error);
        console.error('Error object keys:', Object.keys(error || {}));
        console.error('Error stringified:', JSON.stringify(error, null, 2));
        
        // Check for 401 authentication error
        if (error?.message?.includes('401') || error?.code === 'UNAUTHORIZED') {
          console.error('❌ AUTHENTICATION ERROR: Your OnchainKit API Key is invalid or expired.');
          console.error('Please verify your API key at: https://portal.cdp.coinbase.com/');
        }
      }}
      onStatus={(status) => {
        console.log('Buy status:', status);
      }}
      onSuccess={(receipt) => {
        console.log('Buy success:', receipt);
      }}
    />
  );
}
