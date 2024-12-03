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

API-key:aptoslabs_GHmmSAjuar5_9PjHbMorG112krPMpWkyPXRMMMmdJhb7

```

```
M aptos move new --name arcadia_move --profile default
```

### Run the app

```


```
