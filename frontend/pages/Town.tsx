import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

interface HeroNFT {
  description: string;
  image: string;
  name: string;
  external_url: string;
  attributes: {
    type: string;
    value: string;
  }[];
}

function HeroCard({ hero }: { hero: HeroNFT }) {
  return (
    <div className="border rounded-lg p-4 m-2">
      <h3 className="text-xl font-bold">{hero.name}</h3>
      {hero.image && <img src={hero.image} alt={hero.name} className="w-48 h-48 object-cover" />}
      <div className="mt-2">
        {hero.attributes.map((attr, i) => (
          <div key={`${attr.type}-${i}`} className="flex gap-2">
            <span className="font-semibold">{attr.type}:</span>
            <span>{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TownPage() {
  const { account, connected } = useWallet();
  const [heroes, setHeroes] = useState<HeroNFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNFTs() {
      if (connected && account?.address) {
        setIsLoading(true);
        try {
          const userNFTs = await fetchUserNFTs(account.address);
          setHeroes(userNFTs);
        } catch (error) {
          console.error('Error fetching NFTs:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadNFTs();
  }, [account, connected]);

  async function fetchUserNFTs(address: string): Promise<HeroNFT[]> {
    try {
      // This is a basic implementation - you'll need to adjust the API endpoint
      const response = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`);
      const data = await response.json();
      
      // Filter and transform the data to match HeroNFT interface
      const nfts = data
        .filter((resource: any) => resource.type.includes('TokenStore'))
        .map((token: any) => ({
          description: token.data.description || '',
          image: token.data.uri || '',
          name: token.data.name || '',
          external_url: `https://arcadia.cmuba.org/${token.data.id}`,
          attributes: [
            {
              type: "basic",
              value: token.data.property_version || "1"
            }
            // Add more attributes as needed
          ]
        }));

      return nfts;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }

  if (!connected) {
    return (
      <div className="p-4 text-center">
        Please connect your wallet to view your heroes
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        Loading your heroes...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Heroes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((hero, i) => (
          <HeroCard key={`hero-${i}`} hero={hero} />
        ))}
      </div>
    </div>
  );
} 