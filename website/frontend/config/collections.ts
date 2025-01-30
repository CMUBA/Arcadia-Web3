export interface Collection {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: '0xbce80457b6911b37c73a67f0996f5c000f4f9a9ad6b5bf240d45a5f613e73592',
    name: 'Default Collection',
    description: 'The default NFT collection',
  },
  {
    id: '0x1b9d5661706d50ff79c98410fa51dc280855ecba916bc561e25d7002c89f82e1',
    name: 'Heroes Collection',
    description: 'Special heroes collection',
  },
  {
    id: '0x692ecd0c79e81c597d70932a80bea912942519191ff72874413e34ca96d8b6f3',
    name: 'Infinity Garden Collection',
    description: 'Arcadia Infinity Garden Collection',
  },
]; 