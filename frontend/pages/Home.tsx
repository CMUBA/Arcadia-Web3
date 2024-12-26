import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState, useMemo } from "react";
import { NavBar } from "../components/NavBar";
import { HeroNFT, HeroContractData } from '../types/hero';
import { Collection, COLLECTIONS } from '@/config/collections';
import { useGetPNTBalance } from '@/hooks/useGetPNTBalance';
import { useGetAccountTokens } from '@/hooks/useGetAccountTokens';

// 定义装备槽位布局
const EQUIPMENT_SLOTS = {
  row1: ['Helmet'],
  row2: ['Necklace'],
  row3: ['Ring', 'Armor', 'Gloves'],
  row4: ['Weapon', 'Shield'],
  row5: ['Boots']
};

export function Home() {
  const { account, connected } = useWallet();
  const { data: pntData } = useGetPNTBalance();
  const { data: tokenData } = useGetAccountTokens();
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const [heroNFTs, setHeroNFTs] = useState<HeroNFT[]>([]);
  const [heroData, setHeroData] = useState<HeroContractData | null>(null);

  // 保留原有的 collection select 处理函数
  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  // Filter NFTs by selected collection
  const selectedNFTs = useMemo(() => {
    if (!tokenData?.token_activities_v2) return [];
    return tokenData.token_activities_v2.filter(
      activity => activity.current_token_data.collection_id === selectedCollection.id
    );
  }, [tokenData, selectedCollection.id]);

  // Get current NFT data for display
  const currentNFT = useMemo(() => {
    return selectedNFTs[0]?.current_token_data;
  }, [selectedNFTs]);

  const renderEquipmentSlot = (slot: string) => (
    <div 
      key={slot}
      className="aspect-square bg-gray-100 rounded border-2 border-gray-300 flex flex-col items-center justify-center p-2"
    >
      <div className="w-6 h-6 bg-gray-200 rounded-full mb-1" />
      <span className="text-xs text-gray-500 text-center">{slot}</span>
    </div>
  );

  return (
    <>
      <NavBar 
        onCollectionSelect={handleCollectionSelect}
        currentCollectionId={selectedCollection.id}
        showCollectionSelector={true}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Main Character Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Hero Stats Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Hero Stats</h2>
            {currentNFT && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">{currentNFT.token_name}</h3>
                <p className="text-gray-600">{currentNFT.description}</p>
                {Object.entries(currentNFT.token_properties).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-semibold">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Character Preview Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Character Preview</h2>
            {currentNFT?.token_uri ? (
              <img 
                src={currentNFT.token_uri} 
                alt={currentNFT.token_name}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No preview available</span>
              </div>
            )}
          </div>

          {/* Equipment Grid Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Equipment</h2>
            <div className="grid grid-cols-5 gap-2 h-full">
              {/* Row 1 - Helmet */}
              <div className="col-start-3">{renderEquipmentSlot('Helmet')}</div>
              
              {/* Row 2 - Necklace */}
              <div className="col-start-3 row-start-2">{renderEquipmentSlot('Necklace')}</div>
              
              {/* Row 3 - Ring, Armor, Gloves */}
              <div className="col-start-2 row-start-3">{renderEquipmentSlot('Ring')}</div>
              <div className="col-start-3 row-start-3">{renderEquipmentSlot('Armor')}</div>
              <div className="col-start-4 row-start-3">{renderEquipmentSlot('Gloves')}</div>
              
              {/* Row 4 - Weapon, Shield */}
              <div className="col-start-2 row-start-4">{renderEquipmentSlot('Weapon')}</div>
              <div className="col-start-4 row-start-4">{renderEquipmentSlot('Shield')}</div>
              
              {/* Row 5 - Boots */}
              <div className="col-start-3 row-start-5">{renderEquipmentSlot('Boots')}</div>
            </div>
          </div>
        </div>

        {/* PNT Balance Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">PNT Balance</h2>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold">
                {pntData ? `${pntData.balance.toLocaleString()} ${pntData.symbol}` : '0 PNT'}
              </span>
              <span className="text-sm text-gray-500">
                {account?.address && `Account: ${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Inventory</h2>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {[...Array(48)].map((_, index) => (
              <div 
                key={`inventory-${index}`}
                className="aspect-square bg-gray-100 rounded border-2 border-gray-300"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 