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
      "type": "basic",
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
0. example metadata of EIP1155(more here: https://github.com/ethereum/ercs/blob/master/ERCS/erc-1155.md)
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
1. we will upgrade the metadata to add more attributes and skills for each hero.
   ```json

{
    
}
   '''

## Questions
   有几个问题请教老师，
   第 1 个就是真实的 NFT 的数据结构，安装本 repo 的 NFT，他们分别存储再哪里，如何读取
   第 2 个问题就是我，我这样设计对不对？就是英雄，那英雄首先它是一个唯一凭证，存储一些不变的东西
   但是因为 mutation 可以有更改属性 value，比如说 hero 图片，你英雄级别不同，图片不同
   对英雄的属性和技能我计划放在链上合约。这个合约里边嗯针对每一个唯一的 nft 有一个唯一的英雄属性记录。