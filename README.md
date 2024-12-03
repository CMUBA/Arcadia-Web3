# Arcadia-move-contracts

initiated by Aptos infra

## Plan

Plan: [Plan Nov Dec and Jan](https://www.notion.so/cmuba/Plan-Nov-Dec-and-Jan-1456900e50b680e689d8cde30521938c)

![Arcadia-five-components](https://raw.githubusercontent.com/jhfnetboy/MarkDownImg/main/img/202412021146175.png)

## Architecture

## Progress

### Initiate Aptos CLI

```
aptos init --network testnet  or devnet

got:
 Account 0x9d784d8c3f469661767f2c428a915246548486e711eff740a0d12ddfe603efff doesn't exist, creating it and funding it with 100000000 Octas
Account 0x9d784d8c3f469661767f2c428a915246548486e711eff740a0d12ddfe603efff funded successfully

aptos config show-profiles

got:
{
  "Result": {
    "default": {
      "has_private_key": true,
      "public_key": "0xcff4046e58182165a372760809acf7bc72d195c746fbf74aa99de8bd3578f3d0",
      "account": "9d784d8c3f469661767f2c428a915246548486e711eff740a0d12ddfe603efff",
      "rest_url": "https://fullnode.devnet.aptoslabs.com",
      "faucet_url": "https://faucet.devnet.aptoslabs.com"
    }
  }
}

aptos account list --query balance

got:
{
  "Result": [
    {
      "coin": {
        "value": "100000000"
      },
      "deposit_events": {
        "counter": "0",
        "guid": {
          "id": {
            "addr": "0x9d784d8c3f469661767f2c428a915246548486e711eff740a0d12ddfe603efff",
            "creation_num": "2"
          }
        }
      },
      "frozen": false,
      "withdraw_events": {
        "counter": "0",
        "guid": {
          "id": {
            "addr": "0x9d784d8c3f469661767f2c428a915246548486e711eff740a0d12ddfe603efff",
            "creation_num": "3"
          }
        }
      }
    }
  ]
}

```

### Create app

```
npx create-aptos-dapp@latest

got:
Success! You're ready to start building your dapp on Aptos.

API-key:
aptoslabs_GHmmSAjuar5_9PjHbMorG112krPMpWkyPXRMMMmdJhb7

npm install(if you need to install dependencies)

```

```
M aptos move new --name arcadia_move --profile default
```

### Run the app

```
npm run dev

```
--------------------------------


## Features Roadmap

### V0.1 Core Features

| Feature Category | Description | Implementation Details | Tech Detail |
|-----------------|-------------|------------------------|-------------|
| Authentication | Email login via AptosConnect | Basic email authentication | - AptosConnect SDK integration<br>- JWT token management<br>- Session handling |
| NFT Marketplace | Basic NFT trading with APT/PNTs | - Purchase NFT heroes and equipment<br>- Fixed price listings | - Smart contract for NFT trading<br>- APT/PNT token integration<br>- Metadata storage on IPFS |
| Hero System | Hero NFTs and Dungeon Battles | - Basic hero NFT implementation<br>- Simple attribute system<br>- Basic dungeon battle mechanics<br>- PNT token rewards | - ERC-721 compatible NFTs<br>- On-chain attribute storage<br>- Battle logic in Move<br>- PNT reward distribution system |
| Coupon System | Basic redemption mechanics | - QR code/numeric code generation<br>- Basic redemption verification | - QR generation library<br>- Verification smart contract<br>- Coupon metadata storage |
| Business Portal | Merchant coupon management | - Basic merchant login<br>- Simple coupon write-off interface | - Merchant authentication system<br>- Write-off transaction handling<br>- Business profile storage |
| Game Mechanics | Core gameplay systems | - On-chain NFT hero loading/saving<br>- Basic PNT wallet integration<br>- Simple skill tree<br>- Basic equipment system<br>- Single art style for equipment<br>- Server-side map/dungeon system | - Move modules for game logic<br>- State management system<br>- Equipment/skill data structures<br>- Map generation algorithms |

### V0.2 Enhanced Features

| Feature Category | Planned Improvements | Tech Detail |
|-----------------|---------------------|-------------|
| Authentication | - Enhanced security with email + fingerprint verification | - Biometric authentication integration<br>- Enhanced security protocols<br>- Multi-factor auth system |
| NFT Marketplace | - Community marketplace features<br>- Player-to-player NFT trading<br>- Custom shops implementation | - P2P trading smart contracts<br>- Dynamic pricing mechanisms<br>- Shop management system |
| Hero System | - Conversion to Soul-Bound Tokens (SBT)<br>- PvP arena implementation<br>- Enhanced battle mechanics | - SBT implementation in Move<br>- PvP matchmaking system<br>- Advanced battle algorithms |
| Community Features | - Integrated shop system<br>- Community interaction tools<br>- Enhanced marketplace features | - Social features backend<br>- Community governance system<br>- Reputation system |
| Business Tools | - Mobile app for merchants<br>- QR scanning functionality<br>- Enhanced code input system | - Mobile app development<br>- Native QR scanning<br>- Offline verification system |
| Game Mechanics | - On-chain map registration<br>- Custom map editor integration<br>- Advanced skill tree system<br>- Expanded equipment variety<br>- Multiple art styles<br>- Enhanced upgrade paths | - Map verification system<br>- Custom editor integration<br>- Advanced skill tree algorithms<br>- Equipment combination system |
