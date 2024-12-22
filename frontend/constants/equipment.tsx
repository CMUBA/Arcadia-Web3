import React from 'react';
import { GiHelmet, GiNecklace, GiRing, GiBroadsword, GiChestArmor, GiShield, GiBoots, GiGloves } from 'react-icons/gi';

export interface EquipmentSlot {
  name: string;
  icon: React.ReactNode;
}

export const equipment: EquipmentSlot[] = [
  { name: 'Helm', icon: <GiHelmet /> },
  { name: 'Necklace', icon: <GiNecklace /> },
  { name: 'Ring Left', icon: <GiRing /> },
  { name: 'Weapon', icon: <GiBroadsword /> },
  { name: 'Armor', icon: <GiChestArmor /> },
  { name: 'Shield', icon: <GiShield /> },
  { name: 'Ring Right', icon: <GiRing /> },
  { name: 'Boots', icon: <GiBoots /> },
  { name: 'Gloves', icon: <GiGloves /> },
];