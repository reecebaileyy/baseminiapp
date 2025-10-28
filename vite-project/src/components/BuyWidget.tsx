import { Buy } from '@coinbase/onchainkit/buy';
import type { Token } from '@coinbase/onchainkit/token';
import styles from './BuyWidget.module.css';

export function BuyWidget() {

  // Wrapped ETH on Base - actual ERC-20 token
  const WETHToken: Token = {
    name: "Wrapped Ether",
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    chainId: 8453,
  };

  return (
    <div className={styles.buyWrapper}>
      <Buy 
        toToken={WETHToken}
        onError={(error) => {
          console.error('Buy error details:', error);
          console.error('Error object keys:', Object.keys(error || {}));
          console.error('Error stringified:', JSON.stringify(error, null, 2));
        }}
        onStatus={(status) => {
          console.log('Buy status:', status);
        }}
        onSuccess={(receipt) => {
          console.log('Buy success:', receipt);
        }}
        
      />
    </div>
  );
}
