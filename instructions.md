# Instructions for Multicall Fam Creation

goal: combine calls to deploy both the Party and the Hypersub one single transaction with Multicall3.

current state: First I click & sign "Create my Community" (party deployment). Afterwards, I click a button and sign for "Deploy Hypersub".

### Solution

1. Add the ABI for Multicall3 to src/lib/abi/multicall3Abi.ts
2. Create a function `createPartyAndHypersub` to deploy both the Party and the Hypersub in one single transaction with Multicall3.
3. Call the createPartyAndHypersub function in useCreatePartyManual hook.
4. Clicking "Create my Community" will call the createPartyAndHypersub function.
5. create a function getDeployHypersubCallData to get the call data for the Hypersub deployment. Reference getPartyCallData for an example generation of the call data. Reference useDeployHypersub to see the call data for the Hypersub deployment.
6. Add the getDeployHypersubCallData function to the createPartyAndHypersub function in the Call[] for Multicall3.

### Resources

Multicall3 Address on all chains

```
0xcA11bde05977b3631167028862bE2a173976CA11
```

Multicall3 ABI

```
[
  "struct Call { address target; bytes callData; }",
  "struct Call3 { address target; bool allowFailure; bytes callData; }",
  "struct Call3Value { address target; bool allowFailure; uint256 value; bytes callData; }",
  "struct Result { bool success; bytes returnData; }",
  "function aggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes[] memory returnData)",
  "function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData)",
  "function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData)",
  "function blockAndAggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)",
  "function getBasefee() view returns (uint256 basefee)",
  "function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)",
  "function getBlockNumber() view returns (uint256 blockNumber)",
  "function getChainId() view returns (uint256 chainid)",
  "function getCurrentBlockCoinbase() view returns (address coinbase)",
  "function getCurrentBlockDifficulty() view returns (uint256 difficulty)",
  "function getCurrentBlockGasLimit() view returns (uint256 gaslimit)",
  "function getCurrentBlockTimestamp() view returns (uint256 timestamp)",
  "function getEthBalance(address addr) view returns (uint256 balance)",
  "function getLastBlockHash() view returns (bytes32 blockHash)",
  "function tryAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (Result[] memory returnData)",
  "function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)",
] as const
```
