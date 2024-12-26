import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

interface NFTData {
  token_data_id: string;
  token_name: string;
  token_uri: string;
  token_properties: Record<string, string>;
  description: string;
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
        const result = await aptos.getAccountOwnedTokensFromCollectionAddress({
          accountAddress: account!.address,
          collectionAddress: collectionId,
        });

        console.log("NFTs from collection:", result);

        if (!result || !result.length) {
          return null;
        }

        return result.map(token => {
          const tokenData = token.current_token_data;
          return {
            token_data_id: token.token_data_id,
            token_name: tokenData?.token_name || '',
            // 从 token_uri 或 metadata_uri 获取图片 URL
            token_uri: tokenData?.token_uri || tokenData?.metadata_uri || '',
            // 从 token_properties 获取属性
            token_properties: tokenData?.token_properties || {},
            description: tokenData?.description || '',
            // 可以添加其他需要的字段
            amount: token.amount,
            token_standard: token.token_standard,
            collection_id: tokenData?.collection_id || '',
          } as NFTData;
        });

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