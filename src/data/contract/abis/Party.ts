export const partyAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'globals',
        type: 'address',
        internalType: 'contract IGlobals',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'fallback',
    stateMutability: 'nonpayable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'IMPL',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'VERSION_ID',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'abdicateAuthority',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'abdicateHost',
    inputs: [
      {
        name: 'newPartyHost',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'accept',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'snapIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'totalVotes',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addAuthority',
    inputs: [
      {
        name: 'authority',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancel',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'proposal',
        type: 'tuple',
        internalType: 'struct PartyGovernance.Proposal',
        components: [
          {
            name: 'maxExecutableTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'cancelDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'proposalData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'contractURI',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decreaseTotalVotingPower',
    inputs: [
      {
        name: 'votingPower',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decreaseVotingPower',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'votingPower',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'delegateCallAndRevert',
    inputs: [
      {
        name: 'impl',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'callData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'delegateVotingPower',
    inputs: [
      {
        name: 'delegate',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'delegationsByVoter',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'disableEmergencyExecute',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'distribute',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'tokenType',
        type: 'uint8',
        internalType: 'enum ITokenDistributor.TokenType',
      },
      {
        name: 'token',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'distInfo',
        type: 'tuple',
        internalType: 'struct ITokenDistributor.DistributionInfo',
        components: [
          {
            name: 'tokenType',
            type: 'uint8',
            internalType: 'enum ITokenDistributor.TokenType',
          },
          {
            name: 'distributionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'party',
            type: 'address',
            internalType: 'contract Party',
          },
          {
            name: 'feeRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'token',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'memberSupply',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'fee',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'totalShares',
            type: 'uint96',
            internalType: 'uint96',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'emergencyExecute',
    inputs: [
      {
        name: 'targetAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'targetCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'amountEth',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'emergencyExecuteDisabled',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'proposal',
        type: 'tuple',
        internalType: 'struct PartyGovernance.Proposal',
        components: [
          {
            name: 'maxExecutableTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'cancelDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'proposalData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'preciousTokens',
        type: 'address[]',
        internalType: 'contract IERC721[]',
      },
      {
        name: 'preciousTokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'progressData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'extraData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'feeBps',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeRecipient',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address payable',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'findVotingPowerSnapshotIndex',
    inputs: [
      {
        name: 'voter',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'timestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
    outputs: [
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDistributionShareOf',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getGovernanceValues',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ProposalStorage.GovernanceValues',
        components: [
          {
            name: 'voteDuration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'executionDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'passThresholdBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'totalVotingPower',
            type: 'uint96',
            internalType: 'uint96',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getProposalEngineOpts',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct ProposalStorage.ProposalEngineOpts',
        components: [
          {
            name: 'enableAddAuthorityProposal',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'allowArbCallsToSpendPartyEth',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'allowOperators',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'distributionsConfig',
            type: 'uint8',
            internalType: 'enum ProposalStorage.DistributionsConfig',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getProposalExecutionEngine',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IProposalExecutionEngine',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getProposalHash',
    inputs: [
      {
        name: 'proposal',
        type: 'tuple',
        internalType: 'struct PartyGovernance.Proposal',
        components: [
          {
            name: 'maxExecutableTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'cancelDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'proposalData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'proposalHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getProposalStateInfo',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum PartyGovernance.ProposalStatus',
      },
      {
        name: 'values',
        type: 'tuple',
        internalType: 'struct PartyGovernance.ProposalStateValues',
        components: [
          {
            name: 'proposedTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'passedTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'executedTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'completedTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'votes',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'totalVotingPower',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'numHosts',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'numHostsAccepted',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'voteDuration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'executionDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'passThresholdBps',
            type: 'uint16',
            internalType: 'uint16',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getVotingPowerAt',
    inputs: [
      {
        name: 'voter',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'timestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
      {
        name: 'snapIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'votingPower',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getVotingPowerShareOf',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'implementation',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'increaseTotalVotingPower',
    inputs: [
      {
        name: 'votingPower',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'increaseVotingPower',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'votingPower',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: 'initData',
        type: 'tuple',
        internalType: 'struct Party.PartyInitData',
        components: [
          {
            name: 'options',
            type: 'tuple',
            internalType: 'struct Party.PartyOptions',
            components: [
              {
                name: 'governance',
                type: 'tuple',
                internalType: 'struct PartyGovernance.GovernanceOpts',
                components: [
                  {
                    name: 'hosts',
                    type: 'address[]',
                    internalType: 'address[]',
                  },
                  {
                    name: 'voteDuration',
                    type: 'uint40',
                    internalType: 'uint40',
                  },
                  {
                    name: 'executionDelay',
                    type: 'uint40',
                    internalType: 'uint40',
                  },
                  {
                    name: 'passThresholdBps',
                    type: 'uint16',
                    internalType: 'uint16',
                  },
                  {
                    name: 'totalVotingPower',
                    type: 'uint96',
                    internalType: 'uint96',
                  },
                  {
                    name: 'feeBps',
                    type: 'uint16',
                    internalType: 'uint16',
                  },
                  {
                    name: 'feeRecipient',
                    type: 'address',
                    internalType: 'address payable',
                  },
                ],
              },
              {
                name: 'proposalEngine',
                type: 'tuple',
                internalType: 'struct ProposalStorage.ProposalEngineOpts',
                components: [
                  {
                    name: 'enableAddAuthorityProposal',
                    type: 'bool',
                    internalType: 'bool',
                  },
                  {
                    name: 'allowArbCallsToSpendPartyEth',
                    type: 'bool',
                    internalType: 'bool',
                  },
                  {
                    name: 'allowOperators',
                    type: 'bool',
                    internalType: 'bool',
                  },
                  {
                    name: 'distributionsConfig',
                    type: 'uint8',
                    internalType: 'enum ProposalStorage.DistributionsConfig',
                  },
                ],
              },
              {
                name: 'name',
                type: 'string',
                internalType: 'string',
              },
              {
                name: 'symbol',
                type: 'string',
                internalType: 'string',
              },
              {
                name: 'customizationPresetId',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'preciousTokens',
            type: 'address[]',
            internalType: 'contract IERC721[]',
          },
          {
            name: 'preciousTokenIds',
            type: 'uint256[]',
            internalType: 'uint256[]',
          },
          {
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
          {
            name: 'rageQuitTimestamp',
            type: 'uint40',
            internalType: 'uint40',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initialized',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isAuthority',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isHost',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lastProposalId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'lastTotalVotingPowerChangeTimestamp',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'votingPower',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'delegate',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mintedVotingPower',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'numHosts',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'preciousListHash',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'propose',
    inputs: [
      {
        name: 'proposal',
        type: 'tuple',
        internalType: 'struct PartyGovernance.Proposal',
        components: [
          {
            name: 'maxExecutableTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'cancelDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'proposalData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'latestSnapIndex',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rageQuit',
    inputs: [
      {
        name: 'tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'withdrawTokens',
        type: 'address[]',
        internalType: 'contract IERC20[]',
      },
      {
        name: 'minWithdrawAmounts',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rageQuitTimestamp',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'royaltyInfo',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setRageQuit',
    inputs: [
      {
        name: 'newRageQuitTimestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenCount',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint96',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'veto',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'votingPowerByTokenId',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AuthorityAdded',
    inputs: [
      {
        name: 'authority',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'AuthorityRemoved',
    inputs: [
      {
        name: 'authority',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BatchMetadataUpdate',
    inputs: [
      {
        name: '_fromTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: '_toTokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Burn',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'votingPower',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DistributionCreated',
    inputs: [
      {
        name: 'tokenType',
        type: 'uint8',
        indexed: false,
        internalType: 'enum ITokenDistributor.TokenType',
      },
      {
        name: 'token',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmergencyExecute',
    inputs: [
      {
        name: 'target',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
      {
        name: 'amountEth',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmergencyExecuteDisabled',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'HostStatusTransferred',
    inputs: [
      {
        name: 'oldHost',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'newHost',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MetadataUpdate',
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PartyCardIntrinsicVotingPowerSet',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'intrinsicVotingPower',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PartyDelegateUpdated',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'delegate',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PartyVotingSnapshotCreated',
    inputs: [
      {
        name: 'voter',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'timestamp',
        type: 'uint40',
        indexed: false,
        internalType: 'uint40',
      },
      {
        name: 'delegatedVotingPower',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'intrinsicVotingPower',
        type: 'uint96',
        indexed: false,
        internalType: 'uint96',
      },
      {
        name: 'isDelegated',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProposalAccepted',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'voter',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'weight',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProposalCancelled',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProposalExecuted',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'executor',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'nextProgressData',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProposalPassed',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProposalVetoed',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'host',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Proposed',
    inputs: [
      {
        name: 'proposalId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'proposer',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'proposal',
        type: 'tuple',
        indexed: false,
        internalType: 'struct PartyGovernance.Proposal',
        components: [
          {
            name: 'maxExecutableTime',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'cancelDelay',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'proposalData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RageQuit',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tokenIds',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'withdrawTokens',
        type: 'address[]',
        indexed: false,
        internalType: 'contract IERC20[]',
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RageQuitSet',
    inputs: [
      {
        name: 'oldRageQuitTimestamp',
        type: 'uint40',
        indexed: false,
        internalType: 'uint40',
      },
      {
        name: 'newRageQuitTimestamp',
        type: 'uint40',
        indexed: false,
        internalType: 'uint40',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyVotedError',
    inputs: [
      {
        name: 'voter',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'BadPreciousListError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BadProposalHashError',
    inputs: [
      {
        name: 'proposalHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'actualHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
  },
  {
    type: 'error',
    name: 'BadProposalStatusError',
    inputs: [
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum PartyGovernance.ProposalStatus',
      },
    ],
  },
  {
    type: 'error',
    name: 'BelowMinWithdrawAmountError',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'CannotDisableRageQuitAfterInitializationError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotEnableRageQuitIfNotDistributionsRequireVoteError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotModifyTotalVotingPowerAndAcceptError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotRageQuitError',
    inputs: [
      {
        name: 'rageQuitTimestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
  },
  {
    type: 'error',
    name: 'DistributionsRequireVoteError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'EthTransferFailed',
    inputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'errData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'ExecutionTimeExceededError',
    inputs: [
      {
        name: 'maxExecutableTime',
        type: 'uint40',
        internalType: 'uint40',
      },
      {
        name: 'timestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
  },
  {
    type: 'error',
    name: 'FixedRageQuitTimestampError',
    inputs: [
      {
        name: 'rageQuitTimestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
  },
  {
    type: 'error',
    name: 'Int192ToUint96CastOutOfRange',
    inputs: [
      {
        name: 'i192',
        type: 'int192',
        internalType: 'int192',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidBpsError',
    inputs: [
      {
        name: 'bps',
        type: 'uint16',
        internalType: 'uint16',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidDelegateError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidGovernanceParameter',
    inputs: [
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'InvalidNewHostError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidTokenOrderError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MismatchedPreciousListLengths',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotATokenError',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'contract IERC20',
      },
    ],
  },
  {
    type: 'error',
    name: 'NotAuthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotMinted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NothingToBurnError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OnlyDelegateCallError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OnlyWhenEmergencyActionsAllowedError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OnlyWhenEnabledError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PartyNotStartedError',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ProposalCannotBeCancelledYetError',
    inputs: [
      {
        name: 'currentTime',
        type: 'uint40',
        internalType: 'uint40',
      },
      {
        name: 'cancelTime',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
  },
  {
    type: 'error',
    name: 'TokenTransferFailedError',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'contract IERC20',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'TooManyHosts',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Uint256ToInt192CastOutOfRange',
    inputs: [
      {
        name: 'v',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Uint256ToUint96CastOutOfRange',
    inputs: [
      {
        name: 'v',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnsafeRecipient',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroAddress',
    inputs: [],
  },
] as const
