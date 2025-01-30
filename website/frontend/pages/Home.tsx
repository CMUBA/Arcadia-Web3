import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState, useMemo } from "react";
import { NavBar } from "../components/NavBar";
import { Collection, COLLECTIONS } from '@/config/collections';
import { useGetPNTBalance } from '@/hooks/useGetPNTBalance';
import { useGetAptosNFTs } from '@/hooks/useGetAptosNFTs';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export function Home() {
  const { account } = useWallet();
  const { data: pntData } = useGetPNTBalance();
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const { data: aptosNFTs } = useGetAptosNFTs(selectedCollection.id);
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);

  // 保留原有的 collection select 处理函数
  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  // Get current NFT data for display
  const currentNFT = useMemo(() => {
    if (aptosNFTs && aptosNFTs.length > 0) {
      const nft = aptosNFTs[0];
      
      // 获取 token_uri 中的 metadata
      const fetchMetadata = async () => {
        try {
          if (!nft.token_uri) return null;
          const response = await fetch(nft.token_uri);
          const metadata = await response.json();
          return metadata;
        } catch (error) {
          console.error('Error fetching metadata:', error);
          return null;
        }
      };

      // 处理图片 URL
      const getImageUrl = (uri: string) => {
        if (uri.startsWith('ipfs://')) {
          return `https://ipfs.io/ipfs/${uri.replace('ipfs://', '')}`;
        }
        return uri;
      };

      return {
        token_name: nft.token_name,
        description: nft.description,
        token_uri: getImageUrl(nft.token_uri),
        token_properties: nft.token_properties,
        amount: nft.amount,
        collection_id: nft.collection_id,
        // 添加 metadata 获取函数
        getMetadata: fetchMetadata,
      };
    }
    return null;
  }, [aptosNFTs]);

  // 加载 metadata
  useEffect(() => {
    if (currentNFT?.getMetadata) {
      currentNFT.getMetadata().then(metadata => {
        if (metadata) {
          console.log('NFT Metadata:', metadata);
          setNftMetadata(metadata as NFTMetadata);
        }
      });
    }
  }, [currentNFT]);

  const renderEquipmentSlot = (slot: string) => (
    <div 
      key={slot}
      className="aspect-square bg-gray-100 rounded border-2 border-gray-300 flex flex-col items-center justify-center p-2"
    >
      <div className="w-6 h-6 bg-gray-200 rounded-full mb-1" />
      <span className="text-xs text-gray-500 text-center">{slot}</span>
    </div>
  );

  const renderEquipmentGrid = () => {
    const gridPositions = {
      Helmet: { col: 2, row: 1 },
      Necklace: { col: 4, row: 1 },
      Ring: { col: 2, row: 2 },
      Armor: { col: 3, row: 2 },
      Gloves: { col: 4, row: 2 },
      Weapon: { col: 2, row: 3 },
      Shield: { col: 4, row: 3 },
      Boots: { col: 3, row: 4 },
    } as const;

    return Object.entries(gridPositions).map(([slot, position]) => (
      <div
        key={slot}
        className={`col-start-${position.col} row-start-${position.row}`}
      >
        {renderEquipmentSlot(slot)}
      </div>
    ));
  };

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
            {nftMetadata && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">{nftMetadata.name}</h3>
                <p className="text-gray-600">{nftMetadata.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {nftMetadata.attributes.map((attr) => (
                    <div 
                      key={attr.trait_type}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="text-sm text-gray-500 capitalize">
                        {attr.trait_type}
                      </div>
                      <div className="font-semibold capitalize">
                        {attr.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Character Preview Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Character Preview</h2>
            {nftMetadata?.image ? (
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img 
                  src={nftMetadata.image}
                  alt={nftMetadata.name}
                  className="w-full h-full object-cover"
                />
              </div>
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
              {renderEquipmentGrid()}
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