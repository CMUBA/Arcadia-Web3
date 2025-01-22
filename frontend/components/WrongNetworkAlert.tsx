import { NETWORK } from "@/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNetwork } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export function WrongNetworkAlert() {
  const [isOpen, setIsOpen] = useState(true);
  const { chainId } = useNetwork();

  // Aptos Mainnet Chain ID is 1
  const REQUIRED_CHAIN_ID = 1;
  
  const isWrongNetwork = chainId !== REQUIRED_CHAIN_ID;

  if (!isWrongNetwork) return null;

  return (
    <div className={`network-alert ${isOpen ? 'show' : ''}`}>
      <div className="alert-content">
        <h3>Wrong Network Detected</h3>
        <p>Your wallet is currently on testnet. Please switch to mainnet to continue using the app.</p>
        <p>Required Network: Aptos Mainnet (Chain ID: 1)</p>
        <p>Current Network: {chainId}</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
}
