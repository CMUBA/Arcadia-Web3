"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "./ui/use-toast";
import { aptosClient } from "@/utils";
import { CONTRACT_ADDRESS } from "@/lib/contract";

interface Hero {
  name: string;
  description: string;
  uri: string;
  level: number;
  health: number;
  experience: number;
}

interface HeroContextType {
  hero: Hero | null;
  loading: boolean;
  mintHero: () => Promise<void>;
  refreshHero: () => Promise<void>;
}

const HeroContext = createContext<HeroContextType>({
  hero: null,
  loading: false,
  mintHero: async () => {},
  refreshHero: async () => {},
});

export function useHero() {
  return useContext(HeroContext);
}

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHero = async () => {
    if (!connected || !account) {
      setHero(null);
      setLoading(false);
      return;
    }

    try {
      const resources = await aptosClient().getAccountResources({
        accountAddress: account.address,
      });

      const heroResource = resources.find(
        (r) => r.type === `${CONTRACT_ADDRESS}::hero::Hero`
      );

      if (heroResource) {
        setHero(heroResource.data as Hero);
      } else {
        setHero(null);
      }
    } catch (error) {
      console.error("Error fetching hero:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch hero data",
      });
    } finally {
      setLoading(false);
    }
  };

  const mintHero = async () => {
    if (!connected || !account) return;

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::hero::mint_hero`,
        type_arguments: [],
        arguments: [
          "New Hero",
          "A brave new hero joins Arcadia",
          "https://arcadia.com/hero/default.png",
        ],
      };

      const response = await signAndSubmitTransaction(payload);
      await aptosClient().waitForTransaction({ transactionHash: response.hash });

      toast({
        title: "Success",
        description: "Hero minted successfully!",
      });

      await fetchHero();
    } catch (error) {
      console.error("Error minting hero:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mint hero",
      });
    }
  };

  useEffect(() => {
    fetchHero();
  }, [connected, account]);

  return (
    <HeroContext.Provider
      value={{
        hero,
        loading,
        mintHero,
        refreshHero: fetchHero,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
} 