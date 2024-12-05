"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils";

// Update these with your deployed contract address
const MODULE_ADDRESS = "0x1"; // Replace with your contract address
const COLLECTION_NAME = "Arcadia Collection";
const COLLECTION_DESCRIPTION = "Arcadia Game NFTs";
const COLLECTION_URI = "https://arcadia.com/collection";
const TOKEN_URI = "https://arcadia.com/token/";

interface NFT {
  id: string;
  name: string;
  description: string;
  uri: string;
  owner: string;
  price?: number;
}

export default function MarketplacePage() {
  const { account, connected, network, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && account) {
      fetchNFTs();
    }
  }, [connected, account]);

  const fetchNFTs = async () => {
    try {
      const resources = await aptosClient(network).getAccountResources({
        accountAddress: MODULE_ADDRESS,
      });

      const collectionResource = resources.find(
        (r) => r.type === `${MODULE_ADDRESS}::nft::Collection`
      );

      if (collectionResource) {
        const tokens = collectionResource.data.tokens as NFT[];
        setNfts(tokens);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch NFTs",
      });
    } finally {
      setLoading(false);
    }
  };

  const mintNFT = async () => {
    if (!connected || !account) return;
    
    try {
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::nft::mint_nft`,
        type_arguments: [],
        arguments: [
          "Arcadia NFT #1",
          "A unique Arcadia game NFT",
          `${TOKEN_URI}1`,
        ],
      };

      const response = await signAndSubmitTransaction(payload);
      await aptosClient(network).waitForTransaction({ transactionHash: response.hash });
      
      toast({
        title: "Success",
        description: "NFT minted successfully!",
      });

      // Refresh NFTs after minting
      fetchNFTs();
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mint NFT",
      });
    }
  };

  const buyNFT = async (tokenId: string, price: number) => {
    if (!connected || !account) return;

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::marketplace::buy_token`,
        type_arguments: [],
        arguments: [tokenId, price],
      };

      const response = await signAndSubmitTransaction(payload);
      await aptosClient(network).waitForTransaction({ transactionHash: response.hash });

      toast({
        title: "Success",
        description: "NFT purchased successfully!",
      });

      // Refresh NFTs after purchase
      fetchNFTs();
    } catch (error) {
      console.error("Error buying NFT:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to buy NFT",
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Arcadia NFT Marketplace</h1>
        <Button onClick={mintNFT}>Mint New NFT</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Loading NFTs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <Card key={nft.id}>
              <CardHeader>
                <CardTitle>{nft.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={nft.uri} 
                  alt={nft.name} 
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <p className="text-sm text-muted-foreground mb-4">
                  {nft.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                  </p>
                  {nft.price && nft.owner !== account?.address && (
                    <Button onClick={() => buyNFT(nft.id, nft.price!)}>
                      Buy for {nft.price} APT
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 