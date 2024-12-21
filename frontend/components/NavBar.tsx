import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Link } from "react-router-dom";
import { CollectionSelector } from "./CollectionSelector";
import { Collection } from "../config/collections";

interface NavBarProps {
  onCollectionSelect?: (collection: Collection) => void;
  currentCollectionId?: string;
  showCollectionSelector?: boolean;
}

export function NavBar({ onCollectionSelect, currentCollectionId, showCollectionSelector = false }: NavBarProps) {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <Link 
            to="/home" 
            className="text-white hover:text-gray-300"
          >
            Home
          </Link>
          <Link 
            to="/" 
            className="text-white hover:text-gray-300"
          >
            Market
          </Link>
        </div>
        {showCollectionSelector && onCollectionSelect && (
          <CollectionSelector
            onSelect={onCollectionSelect}
            currentCollectionId={currentCollectionId}
          />
        )}
      </div>
      <WalletSelector />
    </nav>
  );
} 