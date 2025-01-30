import { Collection, COLLECTIONS } from '@/config/collections';

interface CollectionSelectorProps {
  onCollectionSelect: (collection: Collection) => void;
  currentCollectionId?: string;
}

export function CollectionSelector({ onCollectionSelect, currentCollectionId }: CollectionSelectorProps) {
  return (
    <select
      className="bg-gray-700 text-white rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
      value={currentCollectionId}
      onChange={(e) => {
        const collection = COLLECTIONS.find(c => c.id === e.target.value);
        if (collection) {
          onCollectionSelect(collection);
        }
      }}
    >
      {COLLECTIONS.map((collection) => (
        <option key={collection.id} value={collection.id}>
          {collection.name}
        </option>
      ))}
    </select>
  );
} 