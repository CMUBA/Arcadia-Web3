# Arcadia

includes three parts:

1. NFT related functions: publish collection, mint nft, transfer nft, etc.
2. Hero create on chain contract
3. Interaction with on chain contract

## Data structure

### NFT

the example NFT metadata json is:

   ```json {
  "description": "NFT {id} in Arcadia collection",
  "image": "",
  "name": "NFT {id}",
  "external_url": "https://arcadia.cmuba.org/{id}",
  "attributes": [
    {
      "type": "race",
      "value": "human"
    },
    {
      "trait_type": "gender",
      "value": "male"
    }
    {
      "type": "class",
      "value": "warrior"
    }
  ]
 }
```

NFT manage by this tool: https://github.com/CMUBA/Arcadia-NFT-manager
![](https://raw.githubusercontent.com/jhfnetboy/MarkDownImg/main/img/202501301102403.png)

NFT pictures generate by this tool: https://creator.nightcafe.studio/?ru=CJPh5P4BvTRw85h2sZSRcEuF7ll1



### Hero

```json{  
        "name" = "hero name"  // can be modified by user
        "level" = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, and more}, no limit // upgrade by user with PNTs amount
        "class" = {warrior, mage, archer, priest}, only warrior supported now //duplicated with NFT
        "race" = {human, elf, dwarf, orc}, now only human supported now //duplicated with NFT   
        "skill" = {2,3,5,8} // basic skills, can be modified by different upgrade routes, Spring=agile, Summer=attack, Autumn=life, Winter=defense , we have a skill grid to calculate different effects on different skills levels
        }
```

rely on a fixed table to show different effects on different skills levels with upgrade requirements points.

Now we hard code in the server side, and will be moved to the on chain contract later.
https://www.notion.so/cmuba/V0-1-Game-design-YT-1836900e50b680deb938f63ea7a9932f

https://whimsical.com/attribute-7Wjz8qDJJzjQbcffNdpUSm

we set a limitation for all players, they can play only 3 times in a day. 

<!-- and then get more chance energy charging by PNTs. -->

and then they can play without any PNTs rewards only for fun.

### Interaction

We define APIs on APIFox: jhfnetboy has invited you to join a project ArcadiaWeb3 on Apifox https://app.apifox.com/invite/project?token=26bTrfLYhA8bWqOou4TN2


#### Create

You must have a NFT to create a hero.
You can create a hero seamlessly when you bought a NFT.
Buy your NFT with a wallet connect(crypto wallet).
Select a hero race, gender, class, and set your name then create.

#### Load

If you login with a wallet connection or Email or other social accounts, you can load your hero from the server side with a load from on-chain contract background service.

#### Save

You can save your hero to the server side with a save to on-chain contract background service.

#### Redeem

You can redeem a NFT/coupon from a on-chain shop swap contract by PNTs.
Also, everyone can issue their own NFT/coupon to the shop contract to sell.

1. I am a business man, issue 10 coupons(10 NFTs) to the shop contract to sell. I need to pay the protocol fee about 300 PNTs.
2. I am a player, I need to redeem 2 coupons(NFTs) from the shop contract with 100 PNTs.
3. So the protocol gets 20 PNTs from the every coupon redeem transaction.
4. PNTs can be get from the game play, and also can be get from the shop by token swap.


## How to run the project

Access from https://arcadia.cmuba.org/

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

Points address: 0xee3ff47098abfc3640a626732dac235dfdd807b563d806ee8c20460f22d1df85