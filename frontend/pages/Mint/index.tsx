import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';

import { BannerSection } from "@/pages/Mint/components/BannerSection";
import { HeroSection } from "@/pages/Mint/components/HeroSection";
import { StatsSection } from "@/pages/Mint/components/StatsSection";
import { OurStorySection } from "@/pages/Mint/components/OurStorySection";
import { HowToMintSection } from "@/pages/Mint/components/HowToMintSection";
import { OurTeamSection } from "@/pages/Mint/components/OurTeamSection";
import { FAQSection } from "@/pages/Mint/components/FAQSection";
import { Socials } from "@/pages/Mint/components/Socials";
import { ConnectWalletAlert } from "@/pages/Mint/components/ConnectWalletAlert";

import { useGetCollectionData } from "@/hooks/useGetCollectionData";

import { Header } from "@/components/Header";
import { NavBar } from "../../components/NavBar";
import { Collection, COLLECTIONS } from '../../config/collections';

export function Mint() {
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
      toast.dismiss(loadingToast);
      toast.success('Collection data loaded successfully');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to load collection data');
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
