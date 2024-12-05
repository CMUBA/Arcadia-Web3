import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function HomePage() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col items-center">
      <div className="marquee-container">
        {/* Game preview images */}
      </div>
      
      {!connected ? (
        <WalletSelector />
      ) : (
        <button onClick={() => router.push('/landing')}>
          Enter Game
        </button>
      )}
    </div>
  );
} 