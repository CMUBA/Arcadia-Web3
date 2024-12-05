"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { NFT_FUNCTIONS, createTokenUri } from "@/lib/contract";
import { aptosClient } from "@/utils";

export function NFTMinter() {
  const { account, connected, network, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!connected || !account) return;
    setLoading(true);

    try {
      const tokenId = Date.now().toString(); // Simple token ID generation
      const uri = createTokenUri(tokenId);

      const payload = {
        type: "entry_function_payload",
        function: NFT_FUNCTIONS.MINT,
        type_arguments: [],
        arguments: [name, description, uri],
      };

      const response = await signAndSubmitTransaction(payload);
      await aptosClient(network).waitForTransaction({ transactionHash: response.hash });
      
      toast({
        title: "Success",
        description: "NFT minted successfully!",
      });

      // Reset form
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mint NFT",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="NFT Name"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="NFT Description"
          disabled={loading}
        />
      </div>

      <Button onClick={handleMint} disabled={loading || !name || !description}>
        {loading ? "Minting..." : "Mint NFT"}
      </Button>
    </div>
  );
} 