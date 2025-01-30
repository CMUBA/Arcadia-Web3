import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import ExternalLink from "@/assets/icon/external-link.svg";
import { NETWORK } from "@/constants";
import { COLLECTIONS } from '@/config/collections';

export const ConnectWalletAlert = () => {
  const { account } = useWallet();
  const defaultCollection = COLLECTIONS[0];

  if (account) return null;

  return (
    <Alert className="mx-4 max-w-screen-xl w-full self-center">
      <AlertTitle>Connect your wallet</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Connect your wallet to mint NFTs from this collection.</p>
        <div className="flex gap-x-2">
          <a
            className={buttonVariants({ variant: "link", className: "h-auto p-0" })}
            target="_blank"
            href={`https://explorer.aptoslabs.com/account/${defaultCollection.id}?network=${NETWORK}`}
          >
            View collection on Explorer
            <Image src={ExternalLink} />
          </a>
        </div>
      </AlertDescription>
    </Alert>
  );
};
