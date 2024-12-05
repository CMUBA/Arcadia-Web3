import { FC, useState } from 'react';
import Image from 'next/image';

export const GameMap: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Space Map</h2>
      <div className="relative w-full h-[600px]">
        <Image
          src="/images/space-map.png"
          alt="Space Map"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
        {/* Add interactive map locations here */}
      </div>
      
      {selectedLocation && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">{selectedLocation}</h3>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {/* Handle enter location */}}
          >
            Enter Location
          </button>
        </div>
      )}
    </div>
  );
}; 