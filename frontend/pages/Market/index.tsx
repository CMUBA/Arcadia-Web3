import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';

import { BannerSection } from "./components/BannerSection";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { OurStorySection } from "./components/OurStorySection";
import { HowToMintSection } from "./components/HowToMintSection";
import { OurTeamSection } from "./components/OurTeamSection";
import { FAQSection } from "./components/FAQSection";
import { Socials } from "./components/Socials";
import { ConnectWalletAlert } from "./components/ConnectWalletAlert";

import { useGetCollectionData } from "@/hooks/useGetCollectionData";

import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { Collection, COLLECTIONS } from '@/config/collections';

export function Market() {
  const queryClient = useQueryClient();
  const { account } = useWallet();
  const [selectedCollection, setSelectedCollection] = useState<Collection>(COLLECTIONS[0]);
  const { data, isLoading, refetch } = useGetCollectionData(selectedCollection.id);

  const handleCollectionSelect = async (collection: Collection) => {
    if (!collection) {
      toast.error("Collection is undefined");
      return;
    }

    setSelectedCollection(collection);
    toast.success(`Selected collection: ${collection.name} (${collection.id})`);
    
    const loadingToast = toast.loading('Fetching collection data...');
    
    try {
      await queryClient.invalidateQueries({
        queryKey: ["app-state", collection.id]
      });
      await refetch();
      
      if (!data) {
        throw new Error('Failed to load collection data');
      }
      
      toast.dismiss(loadingToast);
      toast.success('Collection data loaded successfully');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : 'Failed to load collection data');
      
      setSelectedCollection(COLLECTIONS[0]);
    }
  };

  useEffect(() => {
    if (account) {
      queryClient.invalidateQueries({
        queryKey: ["app-state", selectedCollection.id]
      });
    }
  }, [account, queryClient, selectedCollection.id]);

  if (isLoading) {
    return (
      <>
        <NavBar 
          onCollectionSelect={handleCollectionSelect}
          currentCollectionId={selectedCollection.id}
          showCollectionSelector={true}
        />
        <div className="text-center p-8">
          <h1 className="title-md">Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar 
        onCollectionSelect={handleCollectionSelect}
        currentCollectionId={selectedCollection.id}
        showCollectionSelector={true}
      />
      <Header />
      <div style={{ overflow: "hidden" }} className="overflow-hidden">
        <main className="flex flex-col gap-10 md:gap-16 mt-6">
          <ConnectWalletAlert />
          <HeroSection 
            collectionData={data}
          />
          <StatsSection 
            collectionData={data}
          />
          <OurStorySection />
          <HowToMintSection />
          <BannerSection />
          <OurTeamSection />
          <FAQSection />
        </main>

        <footer className="footer-container px-4 pb-6 w-full max-w-screen-xl mx-auto mt-6 md:mt-16 flex items-center justify-between">
          <p>{data?.collection.collection_name || selectedCollection.name}</p>
          <Socials />
        </footer>
      </div>
    </>
  );
} 