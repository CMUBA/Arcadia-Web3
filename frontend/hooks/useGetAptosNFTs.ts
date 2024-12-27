import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

interface NFTData {
  token_data_id: string;
  token_name: string;
  token_uri: string;
  token_properties: Record<string, string>;
  description: string;
  amount?: number;
  collection_id?: string;
}

const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);

export function useGetAptosNFTs(collectionId: string) {
  const { account } = useWallet();

  return useQuery({
    queryKey: ["aptos-nfts", account?.address, collectionId],
    enabled: !!account?.address && !!collectionId,
    queryFn: async () => {
      try {
        // 使用新的 API 获取所有数字资产
        const digitalAssets = await aptos.getOwnedDigitalAssets({
          ownerAddress: account!.address,
          minimumLedgerVersion: 1
        });

        console.log("Digital Assets:", digitalAssets);

        // 过滤指定 collection 的资产
        const collectionAssets = digitalAssets.filter(
          asset => asset.current_token_data?.collection_id === collectionId
        );

        if (!collectionAssets.length) {
          return null;
        }

        // 转换数据格式
        return collectionAssets.map(asset => ({
          token_data_id: asset.token_data_id,
          token_name: asset.current_token_data?.token_name || '',
          token_uri: asset.current_token_data?.token_uri || '',
          token_properties: asset.current_token_data?.token_properties || {},
          description: asset.current_token_data?.description || '',
          amount: asset.amount,
          collection_id: asset.current_token_data?.collection_id
        }));

      } catch (error) {
        console.error('Error fetching Aptos NFTs:', error);
        return null;
      }
    },
  });
}

/* 暂时注释掉 Nodit API 相关代码
export function useGetNFTCollections() {
  const { account } = useWallet();

  return useQuery({
    queryKey: ["nft-collections", account?.address],
    enabled: !!account?.address,
    queryFn: async () => {
      try {
        const response = await aptos.indexer.query({
          query: `
            query GetAccountNftCollections($address: String!) {
              current_collection_ownership_v2_view(
                where: {owner_address: {_eq: $address}},
                limit: 1000000,
                offset: 0,
                order_by: [{last_transaction_version: desc}, {collection_id: asc}]
              ) {
                collection_id
                distinct_tokens
                current_collection {
                  collection_id
                  collection_name
                  creator_address
                  current_supply
                  description
                  token_standard
                  total_minted_v2
                  uri
                }
              }
            }
          `,
          variables: {
            address: account?.address,
          },
        });

        return response.current_collection_ownership_v2_view.map(item => ({
          ...item.current_collection,
        }));

      } catch (error) {
        console.error('Error fetching NFT collections:', error);
        return null;
      }
    },
  });
}
*/ 