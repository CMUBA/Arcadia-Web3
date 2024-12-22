import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";
import { CollectionSelector } from "./CollectionSelector";
import { Collection } from "@/config/collections";
import { buttonVariants } from "./ui/button";

interface NavBarProps {
  onCollectionSelect?: (collection: Collection) => void;
  currentCollectionId?: string;
  showCollectionSelector?: boolean;
}

export function NavBar({ onCollectionSelect, currentCollectionId, showCollectionSelector = true }: NavBarProps) {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
        {/* Left side - Navigation Links */}
        <div className="flex gap-4 items-center">
          <Link to="/" className={buttonVariants({ variant: "link" })}>
            Home
          </Link>
          <Link to="/mint" className={buttonVariants({ variant: "link" })}>
            Market
          </Link>
        </div>

        {/* Right side - Collection Selector and Wallet */}
        <div className="flex gap-4 items-center">
          {showCollectionSelector && onCollectionSelect && (
            <CollectionSelector
              onCollectionSelect={onCollectionSelect}
              currentCollectionId={currentCollectionId}
            />
          )}
          <WalletSelector />
        </div>
      </div>
    </nav>
  );
} 