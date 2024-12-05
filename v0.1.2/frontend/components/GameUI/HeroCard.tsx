import { FC } from 'react';
import Image from 'next/image';
import type { HeroNFT } from '@/utils/types';

interface HeroCardProps {
  hero: HeroNFT;
}

export const HeroCard: FC<HeroCardProps> = ({ hero }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={hero.image}
          alt={hero.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h2 className="text-xl font-bold mb-4">{hero.name}</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Health:</span>
          <span>{hero.attributes.health}</span>
        </div>
        <div className="flex justify-between">
          <span>Attack:</span>
          <span>{hero.attributes.attack}</span>
        </div>
        <div className="flex justify-between">
          <span>Defense:</span>
          <span>{hero.attributes.defense}</span>
        </div>
        <div className="flex justify-between">
          <span>Speed:</span>
          <span>{hero.attributes.speed}</span>
        </div>
        <div className="flex justify-between">
          <span>Stamina:</span>
          <span>{hero.attributes.stamina}/100</span>
        </div>
        <div className="flex justify-between">
          <span>Rank:</span>
          <span>{hero.attributes.rank}</span>
        </div>
        <div className="flex justify-between">
          <span>Points:</span>
          <span>{hero.attributes.points}</span>
        </div>
      </div>
    </div>
  );
}; 