import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { NFTCard } from "@/components/NFTCard";

export default function MarketPage() {
  const { signAndSubmitTransaction } = useWallet();

  const buyNFT = async (tokenId: string) => {
    try {
      await signAndSubmitTransaction({
        type: "entry_function_payload",
        function: "arcadia_game::marketplace::buy_nft",
        arguments: [tokenId],
        type_arguments: [],
      });
    } catch (error) {
      console.error("Failed to buy NFT:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* NFT listings */}
    </div>
  );
} 