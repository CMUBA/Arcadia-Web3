import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { HeroNFT, HeroContractData } from '../types/hero';
import { fetchPNTBalance, fetchHeroNFTs, fetchHeroContractData } from '../api/hero';
import { equipment } from '../constants/equipment.tsx';
import { useGetPNTBalance } from '@/hooks/useGetPNTBalance';

export function Home() {
  const { account, connected } = useWallet();
  const [heroNFTs, setHeroNFTs] = useState<HeroNFT[]>([]);
  const [heroData, setHeroData] = useState<HeroContractData | null>(null);
  const { data: pntData } = useGetPNTBalance();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (connected && account?.address) {
        setIsLoading(true);
        try {
          const [nfts, contractData, balance] = await Promise.all([
            fetchHeroNFTs(account.address),
            fetchHeroContractData(account.address),
            fetchPNTBalance(account.address)
          ]);
          
          setHeroNFTs(nfts);
          setHeroData(contractData);
          setPntBalance(balance);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadData();
  }, [account, connected]);

  if (!connected) {
    return (
      <>
        <NavBar showCollectionSelector={false} />
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
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <NavBar showCollectionSelector={false} />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading Hero Data...</h2>
            {/* You can add a spinner here if you want */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar showCollectionSelector={false} />
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
              {equipment.map(slot => (
                <div 
                  key={slot.name}
                  className="relative aspect-square bg-gray-100 rounded border-2 border-gray-300 p-1"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {heroData?.[slot.name.toLowerCase() as keyof HeroContractData] ? (
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
                        <span className="text-4xl">{slot.icon}</span>
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