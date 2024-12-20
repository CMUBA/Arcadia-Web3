import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function HomePage() {
  const { account } = useWallet();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Hero Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Level:</span>
              <span className="font-bold">32</span>
            </div>
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="font-bold">1234/2000</span>
            </div>
            <div className="flex justify-between">
              <span>Health:</span>
              <span className="font-bold">100/100</span>
            </div>
            <div className="flex justify-between">
              <span>Mana:</span>
              <span className="font-bold">50/50</span>
            </div>
          </div>
        </div>

        {/* Character Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Character Preview</h2>
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <img 
              src="https://raw.githubusercontent.com/jhfnetboy/MarkDownImg/main/img/202412201710071.png" 
              alt="Character Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Equipment</h2>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gray-100 rounded border-2 border-gray-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Inventory</h2>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {[...Array(48)].map((_, index) => (
            <div 
              key={index} 
              className="aspect-square bg-gray-100 rounded border-2 border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 