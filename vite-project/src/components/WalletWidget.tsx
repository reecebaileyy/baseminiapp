import {
    ConnectWallet,
    Wallet,
    WalletDropdown
} from '@coinbase/onchainkit/wallet';

export default function WalletDemo() {
    return (
        <Wallet>
            <ConnectWallet />
            <WalletDropdown />
        </Wallet>
    );
}