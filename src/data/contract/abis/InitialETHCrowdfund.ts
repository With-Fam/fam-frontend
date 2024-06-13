export const initialETHCrowdfundAbi = [
  {
    type: 'constructor',
    name: '',
    inputs: [
      {
        type: 'address',
        name: 'globals',
        internalType: 'contract IGlobals',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    name: 'AboveMaximumContributionsError',
    inputs: [
      {
        type: 'uint96',
        name: 'contributions',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'maxContributions',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'ArityMismatch',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'BelowMinimumContributionsError',
    inputs: [
      {
        type: 'uint96',
        name: 'contributions',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'minContributions',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'ContributingForExistingCardDisabledError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'EthTransferFailed',
    inputs: [
      {
        type: 'address',
        name: 'receiver',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'errData',
        internalType: 'bytes',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'ExceedsRemainingContributionsError',
    inputs: [
      {
        type: 'uint96',
        name: 'amount',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'remaining',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'FundingSplitAlreadyPaidError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'FundingSplitNotConfiguredError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidDelegateError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidExchangeRateError',
    inputs: [
      {
        type: 'uint160',
        name: 'exchangeRate',
        internalType: 'uint160',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidFundingSplitRecipient',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidMessageValue',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'MaxTotalContributionsCannotBeZeroError',
    inputs: [
      {
        type: 'uint96',
        name: 'maxTotalContributions',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'MinGreaterThanMaxError',
    inputs: [
      {
        type: 'uint96',
        name: 'min',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'max',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'MinMaxDifferenceTooSmall',
    inputs: [
      {
        type: 'uint96',
        name: 'min',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'max',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'NotAllowedByGateKeeperError',
    inputs: [
      {
        type: 'address',
        name: 'contributor',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'gateKeeper',
        internalType: 'contract IGateKeeper',
      },
      {
        type: 'bytes12',
        name: 'gateKeeperId',
        internalType: 'bytes12',
      },
      {
        type: 'bytes',
        name: 'gateData',
        internalType: 'bytes',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughContributionsError',
    inputs: [
      {
        type: 'uint96',
        name: 'totalContribution',
        internalType: 'uint96',
      },
      {
        type: 'uint96',
        name: 'minTotalContributions',
        internalType: 'uint96',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'NotOwnerError',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OnlyDelegateCallError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OnlyPartyDaoError',
    inputs: [
      {
        type: 'address',
        name: 'notDao',
        internalType: 'address',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OnlyPartyDaoOrHostError',
    inputs: [
      {
        type: 'address',
        name: 'notDao',
        internalType: 'address',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OnlyPartyHostError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OnlyWhenEmergencyActionsAllowedError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'Uint256ToUint40CastOutOfRangeError',
    inputs: [
      {
        type: 'uint256',
        name: 'u256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'Uint256ToUint96CastOutOfRange',
    inputs: [
      {
        type: 'uint256',
        name: 'v',
        internalType: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'WrongLifecycleError',
    inputs: [
      {
        type: 'uint8',
        name: 'lc',
        internalType: 'enum ETHCrowdfundBase.CrowdfundLifecycle',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'ZeroVotingPowerError',
    inputs: [],
    outputs: [],
  },
  {
    type: 'event',
    name: 'Contributed',
    inputs: [
      {
        type: 'address',
        name: 'sender',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'contributor',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'delegate',
        indexed: false,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmergencyExecute',
    inputs: [
      {
        type: 'address',
        name: 'target',
        indexed: false,
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'data',
        indexed: false,
        internalType: 'bytes',
      },
      {
        type: 'uint256',
        name: 'amountEth',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmergencyExecuteDisabled',
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Finalized',
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FundingSplitSent',
    inputs: [
      {
        type: 'address',
        name: 'fundingSplitRecipient',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Refunded',
    inputs: [
      {
        type: 'address',
        name: 'contributor',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'tokenId',
        indexed: true,
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'IMPL',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'batchContribute',
    inputs: [
      {
        type: 'tuple',
        name: 'args',
        components: [
          {
            type: 'uint256[]',
            name: 'tokenIds',
            internalType: 'uint256[]',
          },
          {
            type: 'address',
            name: 'initialDelegate',
            internalType: 'address',
          },
          {
            type: 'uint96[]',
            name: 'values',
            internalType: 'uint96[]',
          },
          {
            type: 'bytes[]',
            name: 'gateDatas',
            internalType: 'bytes[]',
          },
        ],
        internalType: 'struct InitialETHCrowdfund.BatchContributeArgs',
      },
    ],
    outputs: [
      {
        type: 'uint96[]',
        name: 'votingPowers',
        internalType: 'uint96[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'batchContributeFor',
    inputs: [
      {
        type: 'tuple',
        name: 'args',
        components: [
          {
            type: 'uint256[]',
            name: 'tokenIds',
            internalType: 'uint256[]',
          },
          {
            type: 'address[]',
            name: 'recipients',
            internalType: 'address payable[]',
          },
          {
            type: 'address[]',
            name: 'initialDelegates',
            internalType: 'address[]',
          },
          {
            type: 'uint96[]',
            name: 'values',
            internalType: 'uint96[]',
          },
          {
            type: 'bytes[]',
            name: 'gateDatas',
            internalType: 'bytes[]',
          },
        ],
        internalType: 'struct InitialETHCrowdfund.BatchContributeForArgs',
      },
    ],
    outputs: [
      {
        type: 'uint96[]',
        name: 'votingPowers',
        internalType: 'uint96[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'batchRefund',
    inputs: [
      {
        type: 'uint256[]',
        name: 'tokenIds',
        internalType: 'uint256[]',
      },
      {
        type: 'bool',
        name: 'revertOnFailure',
        internalType: 'bool',
      },
    ],
    outputs: [
      {
        type: 'uint96[]',
        name: 'amounts',
        internalType: 'uint96[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'contribute',
    inputs: [
      {
        type: 'address',
        name: 'initialDelegate',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'gateData',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'votingPower',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'contribute',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'initialDelegate',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'gateData',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'votingPower',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'contributeFor',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'recipient',
        internalType: 'address payable',
      },
      {
        type: 'address',
        name: 'initialDelegate',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'gateData',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'votingPower',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'convertContributionToVotingPower',
    inputs: [
      {
        type: 'uint96',
        name: 'contribution',
        internalType: 'uint96',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'votingPower',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertVotingPowerToContribution',
    inputs: [
      {
        type: 'uint96',
        name: 'votingPower',
        internalType: 'uint96',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'contribution',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'delegationsByContributor',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'disableContributingForExistingCard',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
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
    name: 'emergencyExecute',
    inputs: [
      {
        type: 'address',
        name: 'targetAddress',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: 'targetCallData',
        internalType: 'bytes',
      },
      {
        type: 'uint256',
        name: 'amountEth',
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
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'exchangeRate',
    inputs: [],
    outputs: [
      {
        type: 'uint160',
        name: '',
        internalType: 'uint160',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'expiry',
    inputs: [],
    outputs: [
      {
        type: 'uint40',
        name: '',
        internalType: 'uint40',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'finalize',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'fundingSplitBps',
    inputs: [],
    outputs: [
      {
        type: 'uint16',
        name: '',
        internalType: 'uint16',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'fundingSplitPaid',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'fundingSplitRecipient',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address payable',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'gateKeeper',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IGateKeeper',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'gateKeeperId',
    inputs: [],
    outputs: [
      {
        type: 'bytes12',
        name: '',
        internalType: 'bytes12',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getCrowdfundLifecycle',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: 'lifecycle',
        internalType: 'enum ETHCrowdfundBase.CrowdfundLifecycle',
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
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        type: 'tuple',
        name: 'crowdfundOpts',
        components: [
          {
            type: 'address',
            name: 'initialContributor',
            internalType: 'address payable',
          },
          {
            type: 'address',
            name: 'initialDelegate',
            internalType: 'address',
          },
          {
            type: 'uint96',
            name: 'minContribution',
            internalType: 'uint96',
          },
          {
            type: 'uint96',
            name: 'maxContribution',
            internalType: 'uint96',
          },
          {
            type: 'bool',
            name: 'disableContributingForExistingCard',
            internalType: 'bool',
          },
          {
            type: 'uint96',
            name: 'minTotalContributions',
            internalType: 'uint96',
          },
          {
            type: 'uint96',
            name: 'maxTotalContributions',
            internalType: 'uint96',
          },
          {
            type: 'uint160',
            name: 'exchangeRate',
            internalType: 'uint160',
          },
          {
            type: 'uint16',
            name: 'fundingSplitBps',
            internalType: 'uint16',
          },
          {
            type: 'address',
            name: 'fundingSplitRecipient',
            internalType: 'address payable',
          },
          {
            type: 'uint40',
            name: 'duration',
            internalType: 'uint40',
          },
          {
            type: 'address',
            name: 'gateKeeper',
            internalType: 'contract IGateKeeper',
          },
          {
            type: 'bytes12',
            name: 'gateKeeperId',
            internalType: 'bytes12',
          },
        ],
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
      },
      {
        type: 'tuple',
        name: 'partyOpts',
        components: [
          {
            type: 'string',
            name: 'name',
            internalType: 'string',
          },
          {
            type: 'string',
            name: 'symbol',
            internalType: 'string',
          },
          {
            type: 'uint256',
            name: 'customizationPresetId',
            internalType: 'uint256',
          },
          {
            type: 'tuple',
            name: 'governanceOpts',
            components: [
              {
                internalType: 'contract Party',
                name: 'partyImpl',
                type: 'address',
              },
              {
                internalType: 'contract IPartyFactory',
                name: 'partyFactory',
                type: 'address',
              },
              {
                internalType: 'address[]',
                name: 'hosts',
                type: 'address[]',
              },
              {
                internalType: 'uint40',
                name: 'voteDuration',
                type: 'uint40',
              },
              {
                internalType: 'uint40',
                name: 'executionDelay',
                type: 'uint40',
              },
              {
                internalType: 'uint16',
                name: 'passThresholdBps',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'feeBps',
                type: 'uint16',
              },
              {
                internalType: 'address payable',
                name: 'feeRecipient',
                type: 'address',
              },
            ],
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
          },
          {
            type: 'tuple',
            name: 'proposalEngineOpts',
            components: [
              {
                internalType: 'bool',
                name: 'enableAddAuthorityProposal',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'allowArbCallsToSpendPartyEth',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'allowOperators',
                type: 'bool',
              },
              {
                internalType: 'enum ProposalStorage.DistributionsConfig',
                name: 'distributionsConfig',
                type: 'uint8',
              },
            ],
            internalType: 'struct ProposalStorage.ProposalEngineOpts',
          },
          {
            type: 'address[]',
            name: 'preciousTokens',
            internalType: 'contract IERC721[]',
          },
          {
            type: 'uint256[]',
            name: 'preciousTokenIds',
            internalType: 'uint256[]',
          },
          {
            type: 'uint40',
            name: 'rageQuitTimestamp',
            internalType: 'uint40',
          },
          {
            type: 'address[]',
            name: 'authorities',
            internalType: 'address[]',
          },
        ],
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
      },
      {
        type: 'address',
        name: 'customMetadataProvider',
        internalType: 'contract MetadataProvider',
      },
      {
        type: 'bytes',
        name: 'customMetadata',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'initialized',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxContribution',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'maxTotalContributions',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minContribution',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minTotalContributions',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'party',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract Party',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'refund',
    inputs: [
      {
        type: 'uint256',
        name: 'tokenId',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'amount',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sendFundingSplit',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: 'splitAmount',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalContributions',
    inputs: [],
    outputs: [
      {
        type: 'uint96',
        name: '',
        internalType: 'uint96',
      },
    ],
    stateMutability: 'view',
  },
] as const
