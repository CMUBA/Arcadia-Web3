import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

interface TokenData {
  collection_id: string;
  decimals: number;
  description: string;
  token_name: string;
  token_standard: string;
  token_uri: string;
  token_properties: Record<string, string>;
  supply: number;
  maximum: number;
}

interface TokenActivity {
  transaction_version: number;
  type: string;
  token_amount: number;
  current_token_data: TokenData;
}

interface TokenQueryResult {
  token_activities_v2: TokenActivity[];
}

export function useGetAccountTokens() {
  const { account } = useWallet();
  const NODIT_INDEXER_ENDPOINT = import.meta.env.VITE_NODIT_INDEXER_ENDPOINT.replace(/\]$/, '');
  const NODIT_API_KEY = import.meta.env.VITE_NODIT_API_KEY;
  const collections = import.meta.env.VITE_COLLECTION_ADDRESS.split(',');

  return useQuery({
    queryKey: ["account-tokens", account?.address],
    enabled: !!account?.address,
    queryFn: async () => {
      try {
        if (!account?.address) return null;

        const response = await fetch(NODIT_INDEXER_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${NODIT_API_KEY}`,
          },
          body: JSON.stringify({
            query: `
              query GetAccountTokens($address: String!, $collections: [String!]!) {
                token_activities_v2(
                  where: {
                    _and: [
                      { event_account_address: { _eq: $address } },
                      { current_token_data: { collection_id: { _in: $collections } } }
                    ]
                  }
                  order_by: { transaction_version: desc }
                  distinct_on: token_data_id
                ) {
                  transaction_version
                  type
                  token_amount
                  current_token_data {
                    collection_id
                    decimals
                    description
                    token_name
                    token_standard
                    token_uri
                    token_properties
                    supply
                    maximum
                  }
                }
              }
            `,
            variables: {
              address: account.address,
              collections: collections
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data as TokenQueryResult;
      } catch (error) {
        console.error('Error fetching account tokens:', error);
        return null;
      }
    },
  });
} 