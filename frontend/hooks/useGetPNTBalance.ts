import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { aptosClient } from "@/utils/aptosClient";

// Replace hardcoded address with environment variable
const PNT_ADDRESS = import.meta.env.VITE_PNT_ADDRESS;

if (!PNT_ADDRESS) {
  console.warn('VITE_PNT_ADDRESS is not set in environment variables');
}

interface PNTQueryResult {
  fungible_asset_metadata: Array<{
    maximum_v2: string;
    supply_v2: string;
    name: string;
    symbol: string;
    decimals: number;
    asset_type: string;
    icon_uri: string;
  }>;
  current_fungible_asset_balances: Array<{
    amount: string;
  }>;
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
        if (!account?.address) return null;

        const res = await aptosClient().queryIndexer<PNTQueryResult>({
          query: {
            variables: {
              fa_address: PNT_ADDRESS,
              account: account.address.toString(),
            },
            query: `
            query PNTQuery($fa_address: String, $account: String) {
              fungible_asset_metadata(where: {asset_type: {_eq: $fa_address}}) {
                maximum_v2
                supply_v2
                name
                symbol
                decimals
                asset_type
                icon_uri
              }
              current_fungible_asset_balances(
                where: {owner_address: {_eq: $account}, asset_type: {_eq: $fa_address}}
                distinct_on: asset_type
                limit: 1
              ) {
                amount
              }
            }`,
          },
        });

        const metadata = res.fungible_asset_metadata[0];
        if (!metadata) return null;

        const rawBalance = res.current_fungible_asset_balances[0]?.amount ?? "0";
        const balance = Number(rawBalance) / Math.pow(10, metadata.decimals);

        return {
          balance,
          symbol: metadata.symbol,
          decimals: metadata.decimals,
        } satisfies PNTData;
      } catch (error) {
        console.error('Error fetching PNT balance:', error);
        return null;
      }
    },
  });
} 