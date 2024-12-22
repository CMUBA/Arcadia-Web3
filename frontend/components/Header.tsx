import { FC } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { WalletSelector } from "./WalletSelector";
import { IS_DEV } from "@/constants";

interface HeaderProps {
  showCollectionSelector?: boolean;
}

export const Header: FC<HeaderProps> = ({ showCollectionSelector = true }) => {
  const { account } = useWallet();

  if (!account) return null;

  return (
    <header className="header-container px-4 py-6 w-full max-w-screen-xl mx-auto flex items-center justify-between">
      <div className="flex gap-2 items-center flex-wrap">
        {IS_DEV && (
          <>
            <Link className={buttonVariants({ variant: "link" })} to={"/"}>
              Mint Page
            </Link>
            <Link className={buttonVariants({ variant: "link" })} to={"/my-collections"}>
              My Collections
            </Link>
            <Link className={buttonVariants({ variant: "link" })} to={"/create-collection"}>
              Create Collection
            </Link>
          </>
        )}
        <WalletSelector />
      </div>
    </header>
  );
};
