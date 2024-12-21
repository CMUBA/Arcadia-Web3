import { Equipment } from '../types/hero';
import { equipment } from '../constants/equipment';

interface HeroEquipmentProps {
  equipments: {
    [key: string]: Equipment | undefined;
  };
}

export function HeroEquipment({ equipments }: HeroEquipmentProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Equipment</h2>
      <div className="grid grid-cols-3 gap-2">
        {equipment.map((slot) => (
          <div 
            key={slot.name}
            className="relative aspect-square bg-gray-100 rounded border-2 border-gray-300 p-1"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {equipments[slot.name.toLowerCase()] ? (
                <>
                  <img 
                    src={equipments[slot.name.toLowerCase()]?.image}
                    alt={slot.name}
                    className="w-full h-full object-contain p-1"
                  />
                  <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black bg-opacity-50 text-white p-1">
                    {equipments[slot.name.toLowerCase()]?.name}
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
  );
} 