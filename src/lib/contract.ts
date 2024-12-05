export const CONTRACT_ADDRESS = "0x1"; // Replace with your deployed contract address

export const NFT_FUNCTIONS = {
  MINT: `${CONTRACT_ADDRESS}::nft::mint_nft`,
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