# Instructions for Split Creation

goal: Expand the Multicall3 call to deploy 2 splits: one is an equal split amongst all the hosts, the other is a 50/50 split between the party address and the party address.

current state: Hypersub funds recipient is set to the connected wallet. No splits are created.

### Solution

1. Add the ABI for 0xSplits to src/lib/abi/0xSplitsAbi.ts
2. Add the Addresses for the PushSplitFactory to src/constants/addresses.ts
3. Create a function `getCreateSplitCallData` to get the call data for the split deployment.
4. Call the getCreateSplitCallData function in useCreatePartyManual hook for both splits.
5. use the split between the party address and the host split for the hypersub funds recipient.

### Resources

PushSplitFactory Addresses

```
base: 	0xaDC87646f736d6A82e9a6539cddC488b2aA07f38
base sepolia: 0xaDC87646f736d6A82e9a6539cddC488b2aA07f38
```

PushSplitFactory ABI

```
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_splitsWarehouse",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "indexed": false,
        "internalType": "struct SplitV2Lib.Split",
        "name": "splitParams",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "SplitCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "SPLIT_WALLET_IMPLEMENTATION",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "internalType": "struct SplitV2Lib.Split",
        "name": "_splitParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      }
    ],
    "name": "createSplit",
    "outputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "internalType": "struct SplitV2Lib.Split",
        "name": "_splitParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_salt",
        "type": "bytes32"
      }
    ],
    "name": "createSplitDeterministic",
    "outputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "internalType": "struct SplitV2Lib.Split",
        "name": "_splitParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_salt",
        "type": "bytes32"
      }
    ],
    "name": "isDeployed",
    "outputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_hash",
        "type": "bytes32"
      }
    ],
    "name": "nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "internalType": "struct SplitV2Lib.Split",
        "name": "_splitParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "predictDeterministicAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "recipients",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "allocations",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalAllocation",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "distributionIncentive",
            "type": "uint16"
          }
        ],
        "internalType": "struct SplitV2Lib.Split",
        "name": "_splitParams",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_salt",
        "type": "bytes32"
      }
    ],
    "name": "predictDeterministicAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```
