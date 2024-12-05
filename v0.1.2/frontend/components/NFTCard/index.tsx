import { FC } from 'react';
import Image from 'next/image';
import { HeroAttributes } from '@/utils/types';

interface NFTCardProps {
  tokenId: string;
  name: string;
  image: string;
  attributes: HeroAttributes;
  price: number;
  onBuy: (tokenId: string) => void;
}

export const NFTCard: FC<NFTCardProps> = ({
  tokenId,
  name,
  image,
  attributes,
  price,
  onBuy,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="mt-2 space-y-1">
          <p>Health: {attributes.health}</p>
          <p>Attack: {attributes.attack}</p>
          <p>Defense: {attributes.defense}</p>
          <p>Speed: {attributes.speed}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">{price} APT</span>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => onBuy(tokenId)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}; 