import { HeroNFT, HeroContractData } from '../types/hero';

// Fetch PNT balance
export async function fetchPNTBalance(address: string): Promise<string> {
  const response = await fetch(`https://api.nodit.io/v1/accounts/${address}/balance`);
  const data = await response.json();
  return data.balance;
}

// Fetch hero NFT data
export async function fetchHeroNFTs(address: string): Promise<HeroNFT[]> {
  const response = await fetch(`https://api.nodit.io/v1/accounts/${address}/nfts`);
  const data = await response.json();
  return data.nfts;
}

// Fetch hero contract data
export async function fetchHeroContractData(address: string): Promise<HeroContractData> {
  const response = await fetch(`https://api.nodit.io/v1/accounts/${address}/resource/0x1::hero::HeroData`);
  const data = await response.json();
  return data;
} 