# V0.1 user case list

[TOC]

## We will create

- homepage
- landing page
- market page
- game page

### Homepage: register and enter

- A static page
- Show some pictures of the game with marquee effect
- Show a play button
- Play button is a register button for new users and login button for old users
- you can set a auto login for old users
- use aptos-wallet-adapter, which is a official package: [https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example], please follow the example, create this page and button
- - Please keep the original demo page, some interaction with on-chain contract like demo page, we will use it for future features.

### Landing page: beginner guide

- If you are a new user, click the login button in the homepage, you will see this page
- Show the essential information to the player
- Hometown, you can initiate your hero here
- hometown has NFT market place, redeem Racks(shop), equipment shops, three entrance button with pictures
- Space-map,you can begin your adventure here(enter the game)
- please use simple Next.js page to create this page

### Market page: Buy NFT

- Click the market button in the landing page, enter the market page
- It is a single NFT market page
- Player can buy any NFT
- One NFT is one hero
- We use aptos NFT template create this application
- please use this repo, which we used npx to create market page
- follow the guide: [](https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template)
- please use simple Next.js,shadcnui to create this page

### Game page: Load hero

- If you have a NFT, it is also a hero.
- Click enter game, load NFT first, show attributes in the page
- the attributes structure is like this:
- please use simple Next.js page to create this page

#### Hero attributes

1. one NFT mint one hero with random attributes
2. the attributes are like this:

``` json

{
  "name": "hero", // defined by user
  "owner": "0x1234567890123456789012345678901234567890", // who owns this hero
  "points": 0, // the points of the hero, can be used to buy items
  "attributes": {
    "health": 100, // get random after mint
    "attack": 10,
    "defense": 5,
    "speed": 5
  },
  "achievements": [], // the achievements of the hero
  "stamina": 100, // the stamina of the hero, daily limit 100
  "discount_coupon": 0, // the discount coupon of the hero, can be used to buy items
  "rank": 0 // the rank of the hero
}
```

#### Gane Ranks

- The game has a ranking system, you can see the ranking list in the game page
- The ranking list is based on the hero's level
- The hero's level is based on the attributes
- The hero's level formula is: `level = (health + attack + defense + speed) / 4`
- The hero's experience is the sum of the attributes


## v0.1.1

arcadia-game/
├── pages/                    # Move from frontend/pages to root
│   ├── _app.tsx             # Add this for layout wrapper
│   ├── index.tsx            # Home page
│   ├── landing.tsx          # Landing page
│   ├── game.tsx             # Game page
│   └── market.tsx           # Market page
│
├── components/              # Move from frontend/components
│   ├── Landing/
│   │   ├── BeginnerGuide.tsx
│   │   ├── TownSection.tsx
│   │   └── SpaceMapSection.tsx
│   ├── Game/
│   │   ├── HeroCard.tsx
│   │   └── GameMap.tsx
│   └── shared/
│       └── Layout.tsx
│
├── utils/                   # Move from frontend/utils
│   ├── types.ts
│   └── aptosClient.ts
│
├── styles/                  # Add styles directory
│   └── globals.css
│
├── public/                  # Add public directory for images
│   └── images/
│       ├── market.png
│       ├── shop.png
│       ├── redeem.png
│       └── space-preview.png
│
├── package.json
└── tsconfig.json

## v0.1.2

1. page.tsx is a home page, show the game introduction and some pictures, follow this page: https://godsunchained.com/ style.

2. move the "connect a wallet" button to be the login button in the top right corner.

3. add a Play button after Wallet Connected in the Wallet Connection card area.

4. after click play button, it will redirect to the landing page, which include select a NFT in the market place and minting NFT and if you has a NFT, then loading NFT hero to the game page automatically.

5. landing page include three sections introduction: Beginner Guide, Town Section, Space Map Section, besides the nft market place.
6. move switch button: Auto reconnect on page load to the top right corner.
7. add a address label in the landing page, show the connected address.
8. follow the NFT minting template: https://learn.aptoslabs.com/en/dapp-templates/nft-minting-template, create the market feature, source code.
9. 
```
To complete the integration:
Replace the CONTRACT_ADDRESS in src/lib/contract.ts with your deployed contract address
Update the function names in NFT_FUNCTIONS to match your Move contract
Update the collection info and token URI format in COLLECTION_INFO and createTokenUri
1. Add proper error handling for contract-specific errors

```

### V0.1.2 Tech stack

- Next.js(npx create-aptos-dapp@latest, NFT minting template)
- Aptos Wallet Adapter, based on [nextjs-example](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/apps/nextjs-example) (Aptos Connect)
- Shadcn UI/Tailwind CSS and more
- Move(aptos-core)
- [Node API]([https://aptos.dev/en/build/apis/fullnode-rest-api-reference])(aptos-core)

### Bugs

1. Auto reconnect on page load is not working.
   - https://aptos-labs.github.io/aptos-wallet-adapter/
   - https://localhost:3000/

2. NFT minting template is not working.

# V0.2 MVP design

Based on the v0.1.2, we will create a MVP version, which include the following features:

1. Register and login(finished in V0.1.2)
   - with a bug: auto reconnect on page load is not working.
2. Buy NFT(with APT or USDT)
	1. Move onchain contractversion
		1. hero nft mint
		2. hero nft buy
3. Load NFT hero attributes
   - with your account address
4. hero data save structure
   - PNTs, server will transfer to your account
   - hero attributes
   - equipments, NFT, like PNTs
5. saving record data structure example(with a new hero attributes)
    ```json
   { "PNTs": 100,
     "hero_attributes": {
      "name": "hero", // defined by user
      "agile": 5,
      "attack": 10,
      "health": 100,
      "defense": 5,
      <!-- "rank": 1, -->
      <!-- "achievements": [], -->
      <!-- "stamina": 100,  -->
     },
     "equipments": [
       {
         "name": "Royal Armor",
         "attributes": {
           "attack": 10,
           "defense": 5
         },
         "hash": "0x1234567890123456789012345678901234567890" // signature of the drop server, verify by the server again
       }
     ],
     "signature": "0x1234567890123456789012345678901234567890" // signature of the saving record by local wallet
   }
   ```
6. Saving record flow
	1. when user login the server first time, the server will send 10 saving ticket to the client
   	1. client send one ticket back to the server when user save the game
   	2. ticket is a random string signed by the server, and when the server receive the ticket, it will verify and save the game to the chain, then write-off the ticket
	2. User need not save the game manually, after clear a round or get something drop, check the time between the last saving time, if over 5 minutes, apply the server, the server can send answer to the client and save the game
	3. the server will verify the saving record whether be legal, include location and saving ticket
	4. User save the game to the server, and server will save the game to the chain after 30 minutes

## V0.2.1

### Main feature: Mint NFT by user(buy NFT)
1. we have a hero contract here: https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/move-examples/token_objects/hero/sources/hero.move
2. we will use this contract to mint NFT
3. But we need to modify the hero contract to fit the MVP design features, inlude:
   1. NFT hero attributes: "hero_attributes": {
      "name": "hero", // defined by user
      "agile": 5,
      "attack": 10,
      "health": 100,
      "defense": 5,
      <!-- "rank": 1, -->
      <!-- "achievements": [], -->
      <!-- "stamina": 100,  -->
     },
     1. have a page to show: enter hero name and click mint button, then mint NFT to the user's account
     2. this page is part of the landing page,town section, we add a new area: Free hero with button "mint"