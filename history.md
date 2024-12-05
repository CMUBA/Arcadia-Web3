# V0.1 user case list

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


## v0.01

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

## v0.02

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
