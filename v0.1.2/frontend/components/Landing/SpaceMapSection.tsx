import { FC } from 'react';
import Image from 'next/image';

interface SpaceMapSectionProps {
  onEnterGame: () => void;
}

export const SpaceMapSection: FC<SpaceMapSectionProps> = ({ onEnterGame }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Space Adventure</h2>
      <div className="relative w-full h-48 mb-4">
        <Image
          src="/images/space-preview.png"
          alt="Space Adventure"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
      <p className="mb-4 text-gray-600">
        Begin your adventure in space! Battle enemies, collect rewards, and become a legend.
      </p>
      
      <button
        type="button"
        onClick={onEnterGame}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Enter Adventure
      </button>
    </div>
  );
}; 