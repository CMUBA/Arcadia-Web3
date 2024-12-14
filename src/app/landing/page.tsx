"use client";

import { Card } from "@/components/ui/card";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHero } from "@/components/HeroProvider";

export default function LandingPage() {
  const { account, connected } = useWallet();
  const { hero, loading, mintHero } = useHero();
  const router = useRouter();

  // Check if user has NFT and redirect to game page
  useEffect(() => {
    // TODO: Add your NFT checking logic here
    const hasNFT = false; // Replace with actual NFT check
    if (hasNFT) {
      router.push('/game');
    }
  }, [account, router]);

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Beginner Guide Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Beginner Guide</h2>
        <Card className="p-6">
          <p>Welcome to Arcadia! Here's how to get started...</p>
        </Card>
      </section>

      {/* Town Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Town</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connected && !loading && !hero && (
            <Card className="p-6">
              <h3 className="font-bold mb-2">Hero Creation</h3>
              <p className="text-sm text-muted-foreground mb-4">Start your journey by creating a hero</p>
              <Button 
                onClick={mintHero} 
                className="w-full"
                variant="outline"
              >
                Mint Free Hero
              </Button>
            </Card>
          )}
          <Card className="p-6">
            <h3 className="font-bold mb-2">NFT Marketplace</h3>
            <p className="text-sm text-muted-foreground mb-4">Trade unique items and heroes</p>
            <Button 
              onClick={() => router.push('/marketplace')}
              className="w-full"
              variant="outline"
            >
              Visit Marketplace
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold mb-2">Redeem Racks</h3>
            <p className="text-sm text-muted-foreground mb-4">Exchange your rewards</p>
            <Button 
              className="w-full"
              variant="outline"
              disabled
            >
              Coming Soon
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold mb-2">Equipment Shop</h3>
            <p className="text-sm text-muted-foreground mb-4">Gear up your hero</p>
            <Button 
              className="w-full"
              variant="outline"
              disabled
            >
              Coming Soon
            </Button>
          </Card>
        </div>
      </section>

      {/* Space Map Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Space Map</h2>
        <Card className="p-6">
          <p>Begin your adventure here...</p>
        </Card>
      </section>
    </div>
  );
}