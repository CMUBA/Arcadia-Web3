export interface HeroAttributes {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  stamina: number;
  rank: number;
  points: number;
}

export interface HeroNFT {
  tokenId: string;
  name: string;
  image: string;
  attributes: HeroAttributes;
  price: number;
} 