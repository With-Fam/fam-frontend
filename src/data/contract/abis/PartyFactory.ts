export const partyFactoryAbi = [
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
    type: 'function',
    name: 'createParty',
    inputs: [
      {
        name: 'partyImpl',
        type: 'address',
        internalType: 'contract Party',
      },
      {
        name: 'authorities',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'opts',
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
        name: 'rageQuitTimestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
    ],
    outputs: [
      {
        name: 'party',
        type: 'address',
        internalType: 'contract Party',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createPartyWithMetadata',
    inputs: [
      {
        name: 'partyImpl',
        type: 'address',
        internalType: 'contract Party',
      },
      {
        name: 'authorities',
        type: 'address[]',
        internalType: 'address[]',
      },
      {
        name: 'opts',
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
        name: 'rageQuitTimestamp',
        type: 'uint40',
        internalType: 'uint40',
      },
      {
        name: 'provider',
        type: 'address',
        internalType: 'contract MetadataProvider',
      },
      {
        name: 'metadata',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'party',
        type: 'address',
        internalType: 'contract Party',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'PartyCreated',
    inputs: [
      {
        name: 'party',
        type: 'address',
        indexed: true,
        internalType: 'contract Party',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
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
        indexed: false,
        internalType: 'contract IERC721[]',
      },
      {
        name: 'preciousTokenIds',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]',
      },
      {
        name: 'creator',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ERC1167FailedCreateClone',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoAuthorityError',
    inputs: [],
  },
] as const
