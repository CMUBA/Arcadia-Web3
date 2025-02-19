# Arcadia
Access from https://arcadia.cmuba.org/

## How to run the project

1. `npm install`
2. add .env file in root
   ```
    PROJECT_NAME=nft-mint(change with your own address)
    VITE_APP_NETWORK=mainnet
    VITE_COLLECTION_CREATOR_ADDRESS=0x7664630eca412a243674da5b9ac58ad5a7fc2d54557d6563905a9c80f25faf66
    VITE_APTOS_API_KEY=""
    VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS=0x7664630eca412a243674da5b9ac58ad5a7fc2d54557d6563905a9c80f25faf66
    #This is the module publisher account's private key. Be cautious about who you share it with, and ensure it is not exposed when deploying your dApp.
    VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY=

    #To fill after you create a collection, will be used for the minting page
    VITE_COLLECTION_ADDRESS="0xbce80457b6911b37c73a67f0996f5c000f4f9a9ad6b5bf240d45a5f613e73592"
    VITE_MODULE_ADDRESS=0xff8f6b4c41bc8995c354d38465ccf811c4fa9f35b02c58b454f6b0cc841e0abb
```
3. `npm run dev`

4. access http://localhost:5173/

5. More configuration, check next section

## How to use Aptos Dapp NFT minting dapp Template

Digital Assets are the NFT standard for Aptos. The Digital Asset template provides an end-to-end NFT minting dapp with a beautiful pre-made UI users can quickly adjust and deploy into a live server.

## Read the NFT minting dapp template docs
To get started with the NFT minting dapp template and learn more about the template functionality and usage, head over to the [NFT minting dapp template docs](https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template) 

## The NFT minting dapp template provides 3 pages:

- **Public Mint NFT Page** - A page for the public to mint NFTs.
- **Create Collection Page** - A page for creating new NFT collections. This page is not accessible on production.
- **My Collections Page** - A page to view all the collections created under the current Move module (smart contract). This page is not accessible on production.

## What tools the template uses?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands

## What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run dev` - a command to run the frontend locally
- `npm run deploy` - a command to deploy the dapp to Vercel

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.
