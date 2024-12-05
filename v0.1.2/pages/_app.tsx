import type { AppProps } from 'next/app';
import { 
  AptosWalletAdapterProvider 
} from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { MSafeWallet } from "@msafe/aptos-wallet-adapter";
import { useMemo } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const wallets = useMemo(
    () => [
      new PetraWallet(),
      new FewchaWallet(),
      new MartianWallet(),
      new PontemWallet(),
      new TrustWallet(),
      new MSafeWallet()
    ],
    []
  );

  return (
    <AptosWalletAdapterProvider 
      wallets={wallets} 
      autoConnect={true}
    >
      <Component {...pageProps} />
    </AptosWalletAdapterProvider>
  );
} 