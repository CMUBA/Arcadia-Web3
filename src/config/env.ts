export const ENV = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'testnet',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://fullnode.testnet.aptoslabs.com/v1',
} as const;

// Validation
if (!ENV.CONTRACT_ADDRESS) {
  throw new Error('CONTRACT_ADDRESS is required in environment variables');
} 