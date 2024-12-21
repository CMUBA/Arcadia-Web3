# Arcadia Frontend
Now we have a basic frontend site to register and mint NFTs.

Requirments for players:
1. Install Pectra Wallet
2. Buy APTOS from any exchange(APT token is the native token of Aptos)
3. Login with your Pectra Wallet, mint NFTs and play the game.

## New Features V1

1. add a preview link for each player after minting, like this: https://aptos.nftscan.com/0x7664630eca412a243674da5b9ac58ad5a7fc2d54557d6563905a9c80f25faf66?module=Activity, the address(0x7664630eca412a243674da5b9ac58ad5a7fc2d54557d6563905a9c80f25faf66) is the login account address.

2. Add a navigation bar on the top of the page, the bar has two links: Market(to the original page), Town(new page) with a login button(original is a button to connect wallet).

3. the town page, if they login with Pectra Wallet, we can get their wallet address and show their heros(NFTs) on the page. Follow the formate below:
   1. the test NFT metadata json is:
   ```json {
  "description": "nft 2 in Arcadia collection",
  "image": "",
  "name": "NFT 2",
  "external_url": "https://arcadia.cmuba.org/2",
  "attributes": [
    {
      "type": "talent",
      "value": "Spring"
    },
    {
      "type": "race",
      "value": "human"
    },
    {
      "type": "class",
      "value": "warrior"
    },
    {
      "type": "level",
      "value": "1"
    }
  ]
 }
 
 another in opensea(1155)
 "attributes": [
    {
      "trait_type": "trait",
      "value": "value"
    },
    {
      "trait_type": "trait",
      "value": "value"
    },
    {
      "trait_type": "trait",
      "value": "value"
},
 '''

5. add a area to show hero cards, the hero cards show the hero attributes and skills from NFT.

## New Features V2
1. example metadata of EIP1155(more here: https://github.com/ethereum/ercs/blob/master/ERCS/erc-1155.md)
   ```json
        {
            "name": "Asset Name",
            "description": "Lorem ipsum...",
            "image": "https:\/\/s3.amazonaws.com\/your-bucket\/images\/{id}.png",
            "properties": {
                "simple_property": "example value",
                "rich_property": {
                    "name": "Name",
                    "value": "123",
                    "display_value": "123 Example Value",
                    "class": "emphasis",
                    "css": {
                        "color": "#ffffff",
                        "font-weight": "bold",
                        "text-decoration": "underline"
                    }
                },
                "array_property": {
                    "name": "Name",
                    "value": [1,2,3,4],
                    "class": "emphasis"
                }
            }
        }
```

2. 1. if user does not login, home page will show a full screen video as background with text: "Welcome to Arcadia
Explore the world of Arcadia, where heroes are born and adventures await.", 
2. if logined and get user's address, use this api:@https://developer.nodit.io/reference/get-nfts-by-account , to fetch user's nft data and show this home page now: show hero stats and equipment and inventory, also, the data coming from fetching user's data from hero contract onchain (not this time)
3. The home page should show (after logined)
   a. user's hero NFT metadata json structure like this json format: 4 attributes, basic, race, class, level;
   
   b. user's hero data in the hero contract(equipments, package, and more):
   Hero name, weapon, shield, armor, helm
   c. user's PNTs token balance, in his user account address

## New Features V3
1. We can only show one collection now depends on .env config, please add a select box  in market page top bar, to switch between different collections we config in config.ts or other config files. 
done

## New Features V4
1. in home page after login, if login user has equipments, show the equipments in the equipment area, replace the placeholder icon.

## New Features V5
1. hero data
    a. hero name = {name}, load from hero contract(set in initial player data)
    b. hero level = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, more than 10}, no limit
    c. hero class = {warrior, mage, archer, priest}, now only warrior supported
    d. hero race = {human, elf, dwarf, orc}, now only human supported
    e. hero Talent = {Spring, Summer, Autumn, Winter}
    f. hero skills = {skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10}, input from hero contract(set from initial player data)
    g. hero equipments = {weapon, shield, armor, helm, amulet(necklace), glove, ring(left, right), boots}, load from hero contract
    h. hero Inventory/package = {item1, item2, item3, item4, item5, item6, item7, item8, item9, item10}, load from hero contract.

  2. hero data save in three places:
    a. hero contract onchain, save hero data: ```json { skills, equipments, package }```
    b. hero nft metadata enum, ```json  
                          hero level = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, more than 10}, no limit
                          hero class = {warrior, mage, archer, priest}, now only warrior supported
                          hero race = {human, elf, dwarf, orc}, now only human supported
                          hero Talent = {Spring, Summer, Autumn, Winter} 
                          ```

    c. hero PNTs balance, show in the frontend, load from user's account address

  3. hero contract: https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/token_objects/hero, use aptos hero example code, and modify it to fit our game.
  4. hero nft metadata: ```json {"description": "nft 2 in Arcadia collection",
  "image": "",
  "name": "NFT 2",
  "external_url": "https://arcadia.cmuba.org/2",
  "attributes": [
    {
      "type": "talent",
      "value": "Spring"
    },
    {
      "type": "race",
      "value": "human"
    },
    {
      "type": "class",
      "value": "warrior"
    },
    {
      "type": "level",
      "value": "1"
    }
  ]
 }```,use this repo's Mint page, and modify it to fit our game.
  5. hero PNTs mint: https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/fungible_asset/fa_coin,use aptos example code, and modify it to fit our game.
  6. how to get: 
    a. PNTs balance: https://developer.nodit.io/reference/getnativebalancebyaccount
    b. hero nft data: https://developer.nodit.io/reference/get-nfts-by-account
    c. hero contract data: https://developer.nodit.io/reference/get-account-resource

  7. how to interact with hero contract:
    a. mint hero nft: https://developer.nodit.io/reference/create-nft
    b. transfer hero nft: https://developer.nodit.io/reference/transfer-nft
    c. update hero contract: https://developer.nodit.io/reference/update-account-resource


## Questions
   有几个问题请教老师，
   第 1 个就是真实的 NFT 的数据结构，安装本 repo 的 NFT，他们分别存储再哪里，如何读取
   第 2 个问题就是我，我这样设计对不对？就是英雄，那英雄首先它是一个唯一凭证，存储一些不变的东西
   但是因为 mutation 可以有更改属性 value，比如说 hero 图片，你英雄级别不同，图片不同
   对英雄的属性和技能我计划放在链上合约。这个合约里边嗯针对每一个唯一的 nft 有一个唯一的英雄属性记录。