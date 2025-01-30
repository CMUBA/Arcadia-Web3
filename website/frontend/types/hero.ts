// Hero NFT Metadata Types
export interface HeroNFTAttributes {
  type: "talent" | "race" | "class" | "level";
  value: string;
}

export interface HeroNFT {
  description: string;
  image: string;
  name: string;
  external_url: string;
  attributes: HeroNFTAttributes[];
}

// Hero Equipment Types
export interface Equipment {
  id: string;
  name: string;
  type: "weapon" | "shield" | "armor" | "helm" | "necklace" | "gloves" | "ring" | "boots";
  image: string;
  stats?: {
    [key: string]: number;
  };
}

// Hero Skill Types
export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  type: string;
}

// Hero Inventory Item Types
export interface InventoryItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  image: string;
}

// Hero Contract Data Types
export interface HeroContractData {
  name: string;
  skills: Skill[];
  equipments: {
    weapon?: Equipment;
    shield?: Equipment;
    armor?: Equipment;
    helm?: Equipment;
    necklace?: Equipment;
    gloves?: Equipment;
    ringLeft?: Equipment;
    ringRight?: Equipment;
    boots?: Equipment;
  };
  inventory: InventoryItem[];
} 