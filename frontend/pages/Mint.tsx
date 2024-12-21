import { useState } from 'react';
import { Collection, COLLECTIONS } from '../config/collections';
import { NavBar } from '../components/NavBar';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { mintNFT } from "../entry-functions/mint_nft";
import { TopBanner } from "../components/TopBanner";

export function Mint() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const [amount, setAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const handleMint = async () => {
    if (!account) return;
    
    setIsLoading(true);
    try {
      const transaction = mintNFT({
        collectionId: selectedCollection.id,
        amount,
      });

      const response = await signAndSubmitTransaction(transaction);
      console.log('Mint successful:', response);
      
      // Show preview link
      const previewUrl = `https://aptos.nftscan.com/${account.address}?module=Activity`;
      // You could show this URL in a notification or modal
      
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar 
        onCollectionSelect={handleCollectionSelect}
        currentCollectionId={selectedCollection.id}
        showCollectionSelector={true}
      />
      <TopBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Mint Your Hero</h2>
              <p className="text-gray-600 mb-6">
                Join the adventure by minting your unique hero NFT. Each hero comes with
                special attributes and abilities.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Mint
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleMint}
                disabled={isLoading || !account}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  isLoading || !account
                    ? 'bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Minting...' : 'Mint NFT'}
              </button>
              {!account && (
                <p className="mt-4 text-sm text-red-600">
                  Please connect your wallet to mint NFTs
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About Arcadia Heroes</h2>
              <p className="text-gray-600 mb-4">
                Arcadia Heroes are unique NFTs that represent powerful warriors in the
                world of Arcadia. Each hero has distinct attributes and abilities that
                make them special.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Unique hero attributes</li>
                <li>Special abilities and powers</li>
                <li>Tradeable on the marketplace</li>
                <li>Use them in battles and adventures</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/hero-preview.jpg"
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Hero Attributes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Rarity Levels</h3>
                  <p className="text-gray-600">
                    Common, Uncommon, Rare, Epic, Legendary
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Classes</h3>
                  <p className="text-gray-600">
                    Warrior, Mage, Archer, Healer, Tank
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Special Abilities</h3>
                  <p className="text-gray-600">
                    Each hero has unique abilities based on their class and rarity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your Petra wallet to get started
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-xl font-bold mb-2">Mint Hero</h3>
              <p className="text-gray-600">
                Choose your amount and mint your unique hero
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Start Adventure</h3>
              <p className="text-gray-600">
                Use your hero in battles and earn rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 