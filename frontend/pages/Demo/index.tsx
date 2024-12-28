import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState, useMemo } from "react";
import { NavBar } from "@/components/NavBar";
import { Collection, COLLECTIONS } from '@/config/collections';
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

interface HeroData {
  name: string;
  level: number;
  class: string;
  race: string;
  gender: string;
  skills: number;
  equipments: {
    weaponID: string;
    shieldID: string;
    armorID: string;
    helmID: string;
    amuletID: string;
    gloveID: string;
    ringLeftID: string;
    ringRightID: string;
    bootsID: string;
  };
  inventory: string[];
}

// Fake hero data for testing
const fakeHeroData: HeroData | null = null;

export function Demo() {
  const { account } = useWallet();
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const { data: aptosNFTs } = useGetAptosNFTs(selectedCollection.id);
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);
  const [heroName, setHeroName] = useState("");
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const heroContract = import.meta.env.VITE_HERO_CONTRACT;

  // 获取当前 NFT 数据
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
        token_data_id: nft.token_data_id,
        token_name: nft.token_name,
        token_uri: getImageUrl(nft.token_uri),
        token_properties: nft.token_properties,
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

  // 处理 collection 选择
  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection);
    setHeroData(null);
    setIsRegistered(false);
    setHeroName("");
  };

  // 检查 NFT 注册状态
  useEffect(() => {
    const checkHeroRegistration = async () => {
      if (aptosNFTs && aptosNFTs.length > 0) {
        try {
          // 模拟检查注册状态
          const isReg = await fakeCheckHeroRegistration(aptosNFTs[0].token_data_id);
          setIsRegistered(isReg);
          
          if (isReg) {
            // 如果已注册，获取英雄数据
            const data = await fakeGetHeroData(aptosNFTs[0].token_data_id);
            if (data) {
              setHeroData(data);
              setHeroName(data.name);
            }
          } else {
            // 如果未注册，清空数据
            setHeroData(null);
            setHeroName("");
          }
        } catch (error) {
          console.error('Error checking hero registration:', error);
        }
      }
    };

    checkHeroRegistration();
  }, [aptosNFTs]);

  // Fake API functions
  const fakeCheckHeroRegistration = async (tokenId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.5;
  };

  const fakeGetHeroData = async (tokenId: string): Promise<HeroData> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fakeHeroData;
  };

  const handleJoinGame = async () => {
    if (!heroName.trim()) {
      alert('Please enter a hero name');
      return;
    }

    try {
      // Simulate contract interaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHeroData({ ...fakeHeroData, name: heroName });
      setIsRegistered(true);
    } catch (error) {
      console.error('Error joining game:', error);
      alert('Failed to join game');
    }
  };

  return (
    <>
      <NavBar 
        onCollectionSelect={handleCollectionSelect}
        currentCollectionId={selectedCollection.id}
        showCollectionSelector={true}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Contract Info Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Hero Contract</h2>
          {heroContract ? (
            <p className="font-mono">{heroContract}</p>
          ) : (
            <p className="text-red-500">Please deploy the hero contract first</p>
          )}
        </div>

        {/* Main Character Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                {!isRegistered && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Input your hero name"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      type="button"
                      onClick={handleJoinGame}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Join Game
                    </button>
                  </div>
                )}
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
            {isRegistered && (
              <button
                type="button"
                onClick={handleJoinGame}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Play
              </button>
            )}
          </div>
        </div>

        {/* Hero Data Section - 只在已注册时显示 */}
        {heroData && isRegistered && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Hero Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Basic Info</h3>
                  <p>Name: {heroData.name}</p>
                  <p>Level: {heroData.level}</p>
                  <p>Class: {heroData.class}</p>
                  <p>Race: {heroData.race}</p>
                  <p>Gender: {heroData.gender}</p>
                  <p>Skills: {heroData.skills}</p>
                </div>
                <div>
                  <h3 className="font-bold">Equipment</h3>
                  {Object.entries(heroData.equipments).map(([slot, id]) => (
                    <p key={slot}>{slot}: {id}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold">Inventory</h3>
                <div className="grid grid-cols-4 gap-2">
                  {heroData.inventory.map((itemId, i) => (
                    <div key={`${itemId}-${i}`} className="p-2 bg-gray-100 rounded">
                      {itemId}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 