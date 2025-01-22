import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ 
  network: Network.MAINNET,
  apiKey: import.meta.env.VITE_APTOS_API_KEY,
  fullnode: "https://api.mainnet.aptoslabs.com/v1"  // 明确指定节点 URL
});

export const aptosClient = new Aptos(config);
