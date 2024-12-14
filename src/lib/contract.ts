import { ENV } from '@/config/env';

export const CONTRACT_ADDRESS = ENV.CONTRACT_ADDRESS!;

export const NFT_FUNCTIONS = {
  MINT: `${CONTRACT_ADDRESS}::hero::mint_hero`,
  BUY: `${CONTRACT_ADDRESS}::marketplace::buy_token`,
  LIST: `${CONTRACT_ADDRESS}::marketplace::list_token`,
  DELIST: `${CONTRACT_ADDRESS}::marketplace::delist_token`,
};

export const COLLECTION_INFO = {
  name: "Arcadia Collection",
  description: "Arcadia Game NFTs",
  uri: "https://arcadia.com/collection",
};

export const createTokenUri = (tokenId: string) => {
  return `https://arcadia.com/token/${tokenId}`;
}; 