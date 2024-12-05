import { FC } from 'react';

export const BeginnerGuide: FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Welcome to Arcadia</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Getting Started</h3>
          <p className="text-gray-600">
            Welcome to Arcadia! Here's what you need to know to begin your adventure:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold mb-2">1. Get Your Hero</h4>
            <p className="text-sm text-gray-600">
              Visit the NFT Market to purchase your first hero with unique attributes.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold mb-2">2. Equip & Upgrade</h4>
            <p className="text-sm text-gray-600">
              Visit the Equipment Shop to gear up your hero for battles.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold mb-2">3. Begin Adventure</h4>
            <p className="text-sm text-gray-600">
              Enter the Space Map to start battling and earning rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 