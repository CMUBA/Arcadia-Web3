import { FC } from 'react';
import { useRouter } from 'next/router';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MarqueeImages } from '@/components/GameUI/MarqueeImages';
import Layout from '@/components/Layout';

const HomePage: FC = () => {
  const router = useRouter();
  const { connected } = useWallet();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <MarqueeImages />
        
        <div className="mt-8 space-y-4">
          {!connected ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Arcadia</h1>
              <WalletSelector />
            </div>
          ) : (
            <button 
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => router.push('/landing')}
            >
              Enter Game
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 