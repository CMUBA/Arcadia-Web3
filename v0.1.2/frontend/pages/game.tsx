import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Layout from '@/components/Layout';
import { HeroCard } from '@/components/GameUI/HeroCard';
import { GameMap } from '@/components/GameUI/GameMap';
import { fetchHeroNFT } from '@/utils/aptosClient';
import type { HeroNFT } from '@/utils/types';

const GamePage: FC = () => {
  const router = useRouter();
  const { account } = useWallet();
  const [hero, setHero] = useState<HeroNFT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account?.address) {
      loadHeroNFT();
    }
  }, [account]);

  const loadHeroNFT = async () => {
    try {
      const heroNFT = await fetchHeroNFT(account?.address as string);
      if (!heroNFT) {
        router.push('/market'); // Redirect to market if no hero NFT
        return;
      }
      setHero(heroNFT);
    } catch (error) {
      console.error('Failed to load hero NFT:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hero) {
    return <div>No hero found. Please purchase one from the marketplace.</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <HeroCard hero={hero} />
          <GameMap />
        </div>
      </div>
    </Layout>
  );
};

export default GamePage; 