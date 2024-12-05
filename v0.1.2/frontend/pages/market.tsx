import { FC, useEffect, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NFTCard } from "@/components/NFTCard";
import Layout from '@/components/Layout';
import { HeroNFT } from '@/utils/types';
import { fetchNFTListings } from '@/utils/aptosClient';

const MarketPage: FC = () => {
  const { signAndSubmitTransaction } = useWallet();
  const [listings, setListings] = useState<HeroNFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const nftListings = await fetchNFTListings();
      setListings(nftListings);
    } catch (error) {
      console.error('Failed to load NFT listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const buyNFT = async (tokenId: string) => {
    try {
      await signAndSubmitTransaction({
        type: "entry_function_payload",
        function: "arcadia_game::marketplace::buy_nft",
        arguments: [tokenId],
        type_arguments: [],
      });
      await loadListings(); // Refresh listings after purchase
    } catch (error) {
      console.error("Failed to buy NFT:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">NFT Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              {...nft}
              onBuy={buyNFT}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MarketPage; 