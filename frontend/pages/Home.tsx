import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";

interface HeroNFT {
  description: string;
  image: string;
  name: string;
  attributes: {
    type: string;
    value: string;
  }[];
}

interface HeroData {
  name: string;
  weapon: string;
  shield: string;
  armor: string;
  helm: string;
}

interface EquipmentSlot {
  name: string;
  image: string | null;
  position: string;
  symbol: string;
}

const EQUIPMENT_SLOTS: EquipmentSlot[] = [
  { name: 'Helm', image: null, position: 'top-2', symbol: '🪖' },
  { name: 'Necklace', image: null, position: 'top-1', symbol: '📿' },
  { name: 'Cape', image: null, position: 'top-3', symbol: '🧥' },
  { name: 'Weapon', image: null, position: 'middle-1', symbol: '⚔️' },
  { name: 'Armor', image: null, position: 'middle-2', symbol: '🛡️' },
  { name: 'Shield', image: null, position: 'middle-3', symbol: '🛡️' },
  { name: 'Ring', image: null, position: 'bottom-1', symbol: '💍' },
  { name: 'Boots', image: null, position: 'bottom-2', symbol: '👢' },
  { name: 'Gloves', image: null, position: 'bottom-3', symbol: '🧤' },
];

export function HomePage() {
  const { account, connected } = useWallet();
  const [heroNFTs, setHeroNFTs] = useState<HeroNFT[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [pntBalance, setPntBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (connected && account?.address) {
        setIsLoading(true);
        try {
          await Promise.all([
            fetchUserNFTs(account.address),
            fetchHeroData(account.address),
            fetchPNTBalance(account.address)
          ]);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadData();
  }, [account, connected]);

  async function fetchUserNFTs(address: string) {
    try {
      // For testing, let's create a mock NFT
      const mockNFT: HeroNFT = {
        description: "Hero NFT",
        image: "/hero-placeholder.png",
        name: "Test Hero",
        attributes: [
          { type: "basic", value: "Spring" },
          { type: "race", value: "human" },
          { type: "class", value: "warrior" },
          { type: "level", value: "1" }
        ]
      };
      setHeroNFTs([mockNFT]);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setHeroNFTs([]);
    }
  }

  async function fetchHeroData(address: string) {
    try {
      // Mock hero data
      const mockHeroData: HeroData = {
        name: "Hero Name",
        weapon: "Sword",
        shield: "Shield",
        armor: "Plate Mail",
        helm: "Crown"
      };
      setHeroData(mockHeroData);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setHeroData(null);
    }
  }

  async function fetchPNTBalance(address: string) {
    try {
      setPntBalance("1000");
    } catch (error) {
      console.error('Error fetching PNT balance:', error);
      setPntBalance("0");
    }
  }

  return (
    <>
      <NavBar showCollectionSelector={false} />
      {!connected ? (
        <div className="relative h-screen w-full">
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          
          {/* Welcome Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
            <h1 className="text-5xl font-bold mb-4">Welcome to Arcadia</h1>
            <p className="text-xl">
              Explore the world of Arcadia, where heroes are born and adventures await.
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Hero Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Hero Stats</h2>
              <div className="space-y-2">
                {heroNFTs[0]?.attributes?.map((attr, index) => (
                  <div key={`attr-${index}`} className="flex justify-between">
                    <span className="capitalize">{attr.type}:</span>
                    <span className="font-bold">{attr.value}</span>
                  </div>
                )) || (
                  <div className="text-gray-400">No attributes available</div>
                )}
              </div>
            </div>

            {/* Character Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Character Preview</h2>
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                {heroNFTs[0]?.image ? (
                  <img 
                    src={heroNFTs[0].image}
                    alt="Character Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-400">No Image Available</div>
                )}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Equipment</h2>
              <div className="grid grid-cols-3 gap-2">
                {EQUIPMENT_SLOTS.map((slot, index) => (
                  <div 
                    key={slot.name}
                    className="relative aspect-square bg-gray-100 rounded border-2 border-gray-300 p-1"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {heroData?.[slot.name.toLowerCase() as keyof HeroData] ? (
                        <>
                          <img 
                            src={`/equipment/${slot.name.toLowerCase()}.png`}
                            alt={slot.name}
                            className="w-full h-full object-contain p-1"
                          />
                          <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black bg-opacity-50 text-white p-1">
                            {slot.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl">{slot.symbol}</span>
                          <span className="text-xs text-gray-500 mt-1">{slot.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PNT Balance */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">PNT Balance</h2>
              <span className="text-2xl font-bold">{pntBalance} PNT</span>
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
      )}
    </>
  );
} 