import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ 
  network: Network.MAINNET,
  apiKey: import.meta.env.VITE_APTOS_API_KEY
});

const aptos = new Aptos(config);

// 导出为函数形式，保持与现有代码兼容
export function aptosClient() {
  return aptos;
}
