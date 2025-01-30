import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Replace hardcoded address with environment variable
const PNT_ADDRESS = import.meta.env.VITE_PNT_ADDRESS;
const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);

if (!PNT_ADDRESS) {
  console.warn('VITE_PNT_ADDRESS is not set in environment variables');
}

interface PNTData {
  balance: number;
  symbol: string;
  decimals: number;
}

export function useGetPNTBalance() {
  const { account } = useWallet();

  return useQuery({
    queryKey: ["pnt-balance", account?.address],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        if (!account?.address || !PNT_ADDRESS) return null;

        // 使用新的 Digital Asset API 获取 PNT 余额
        const assets = await aptos.getOwnedDigitalAssets({
          ownerAddress: account.address,
          minimumLedgerVersion: 1
        });

        // 找到 PNT token
        const pntAsset = assets.find(asset => 
          asset.current_fungible_asset_store?.storage_id.includes(PNT_ADDRESS)
        );

        if (!pntAsset) {
          return {
            balance: 0,
            symbol: 'PNT',
            decimals: 8
          };
        }

        const metadata = await aptos.getFungibleAssetMetadata({
          assetType: pntAsset.asset_type
        });

        return {
          balance: Number(pntAsset.amount) / Math.pow(10, metadata.decimals),
          symbol: metadata.symbol,
          decimals: metadata.decimals
        };

      } catch (error) {
        console.error('Error fetching PNT balance:', error);
        return null;
      }
    },
  });
} 