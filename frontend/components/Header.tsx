import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";
import { IS_DEV } from "@/constants";
import { buttonVariants } from "@/components/ui/button";
import { config } from "@/config";
import { COLLECTIONS } from '@/config/collections';

export function Header() {
  const { data } = useGetCollectionData(COLLECTIONS[0].id);

  const title = useMemo(() => {
    return data?.collection.collection_name ?? config.defaultCollection?.name ?? "NFT Collection Launchpad";
  }, [data?.collection]);

  return (
    <header className="header-container px-4 py-6 w-full max-w-screen-xl mx-auto flex items-center justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">{title}</Link>
      </h1>
      <div className="flex gap-2 items-center flex-wrap">
        {IS_DEV && (
          <>
            <Link className={buttonVariants({ variant: "link" })} to="/market">
              Market Page
            </Link>
            <Link className={buttonVariants({ variant: "link" })} to="/my-collections">
              My Collections
            </Link>
            <Link className={buttonVariants({ variant: "link" })} to="/create-collection">
              Create Collection
            </Link>
          </>
        )}
        <WalletSelector />
      </div>
    </header>
  );
};
