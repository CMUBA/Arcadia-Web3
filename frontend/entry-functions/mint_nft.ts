import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type MintNftArguments = {
  collectionId: string;
  amount: number;
};

export const mintNFT = (args: MintNftArguments): InputTransactionData => {
  const { collectionId, amount } = args;
  
  return {
    data: {
      function: `${MODULE_ADDRESS}::launchpad::mint_nft`,
      typeArguments: [],
      functionArguments: [collectionId, amount],
    }
  };
};

// Create a separate function to handle the preview URL
export const getNFTPreviewUrl = (accountAddress: string): string => {
  return `https://aptos.nftscan.com/${accountAddress}?module=Activity`;
};
