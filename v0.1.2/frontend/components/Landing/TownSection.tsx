import { FC } from 'react';
import Image from 'next/image';

interface TownSectionProps {
  onMarketClick: () => void;
  onShopClick: () => void;
  onRedeemClick: () => void;
}

export const TownSection: FC<TownSectionProps> = ({
  onMarketClick,
  onShopClick,
  onRedeemClick
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hometown</h2>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={onMarketClick}
          className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <Image src="/images/market.png" alt="Market" width={64} height={64} />
          <span className="mt-2">NFT Market</span>
        </button>
        
        <button
          onClick={onShopClick}
          className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <Image src="/images/shop.png" alt="Shop" width={64} height={64} />
          <span className="mt-2">Equipment Shop</span>
        </button>
        
        <button
          onClick={onRedeemClick}
          className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
        >
          <Image src="/images/redeem.png" alt="Redeem" width={64} height={64} />
          <span className="mt-2">Redeem Racks</span>
        </button>
      </div>
    </div>
  );
}; 