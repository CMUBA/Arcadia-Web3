import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type MintNftArguments = {
  collectionId: string;
  amount: number;
};

// 从环境变量获取 module address
const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;

export const mintNFT = (args: MintNftArguments): InputTransactionData => {
  const { collectionId, amount } = args;
  
  return {
    data: {
      // 使用 MODULE_ADDRESS 而不是 collectionId
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
