export const crowdfundFactoryAbi = [
  {
    type: 'function',
    name: 'createAuctionCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract AuctionCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        internalType: 'struct AuctionCrowdfundBase.AuctionCrowdfundOptions',
        components: [
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
          {
            name: 'auctionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'market',
            type: 'address',
            internalType: 'contract IMarketWrapper',
          },
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumBid',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBid',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract AuctionCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createBuyCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract BuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        internalType: 'struct BuyCrowdfund.BuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBuy',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract BuyCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createCollectionBatchBuyCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract CollectionBatchBuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        internalType:
          'struct CollectionBatchBuyCrowdfund.CollectionBatchBuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenIdsMerkleRoot',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract CollectionBatchBuyCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createCollectionBuyCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract CollectionBuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        internalType:
          'struct CollectionBuyCrowdfund.CollectionBuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract CollectionBuyCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createERC20LaunchCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract ERC20LaunchCrowdfund',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'tokenOpts',
        type: 'tuple',
        internalType: 'struct ERC20LaunchCrowdfund.ERC20LaunchOptions',
        components: [
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
            name: 'recipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'totalSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForDistribution',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForRecipient',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForLP',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract ERC20LaunchCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createERC20LaunchCrowdfundWithMetadata',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract ERC20LaunchCrowdfund',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'tokenOpts',
        type: 'tuple',
        internalType: 'struct ERC20LaunchCrowdfund.ERC20LaunchOptions',
        components: [
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
            name: 'recipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'totalSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForDistribution',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForRecipient',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForLP',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'customMetadataProvider',
        type: 'address',
        internalType: 'contract MetadataProvider',
      },
      {
        name: 'customMetadata',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract ERC20LaunchCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createInitialETHCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract InitialETHCrowdfund',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract InitialETHCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createInitialETHCrowdfundWithMetadata',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract InitialETHCrowdfund',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'customMetadataProvider',
        type: 'address',
        internalType: 'contract MetadataProvider',
      },
      {
        name: 'customMetadata',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract InitialETHCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createRollingAuctionCrowdfund',
    inputs: [
      {
        name: 'crowdfundImpl',
        type: 'address',
        internalType: 'contract RollingAuctionCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        internalType: 'struct AuctionCrowdfundBase.AuctionCrowdfundOptions',
        components: [
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
          {
            name: 'auctionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'market',
            type: 'address',
            internalType: 'contract IMarketWrapper',
          },
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumBid',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBid',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'allowedAuctionsMerkleRoot',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'createGateCallData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'inst',
        type: 'address',
        internalType: 'contract RollingAuctionCrowdfund',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'AuctionCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract AuctionCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct AuctionCrowdfundBase.AuctionCrowdfundOptions',
        components: [
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
          {
            name: 'auctionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'market',
            type: 'address',
            internalType: 'contract IMarketWrapper',
          },
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumBid',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBid',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BuyCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract BuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct BuyCrowdfund.BuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBuy',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CollectionBatchBuyCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract CollectionBatchBuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
        internalType:
          'struct CollectionBatchBuyCrowdfund.CollectionBatchBuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenIdsMerkleRoot',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CollectionBuyCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract CollectionBuyCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
        internalType:
          'struct CollectionBuyCrowdfund.CollectionBuyCrowdfundOptions',
        components: [
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
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumPrice',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ERC20LaunchCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract ERC20LaunchCrowdfund',
      },
      {
        name: 'party',
        type: 'address',
        indexed: true,
        internalType: 'contract Party',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'tokenOpts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct ERC20LaunchCrowdfund.ERC20LaunchOptions',
        components: [
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
            name: 'recipient',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'totalSupply',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForDistribution',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForRecipient',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'numTokensForLP',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'InitialETHCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract InitialETHCrowdfund',
      },
      {
        name: 'party',
        type: 'address',
        indexed: true,
        internalType: 'contract Party',
      },
      {
        name: 'crowdfundOpts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct InitialETHCrowdfund.InitialETHCrowdfundOptions',
        components: [
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'disableContributingForExistingCard',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'minTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxTotalContributions',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'exchangeRate',
            type: 'uint160',
            internalType: 'uint160',
          },
          {
            name: 'fundingSplitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'fundingSplitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
        ],
      },
      {
        name: 'partyOpts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct InitialETHCrowdfund.ETHPartyOptions',
        components: [
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
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
            name: 'authorities',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RollingAuctionCrowdfundCreated',
    inputs: [
      {
        name: 'creator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'crowdfund',
        type: 'address',
        indexed: true,
        internalType: 'contract RollingAuctionCrowdfund',
      },
      {
        name: 'opts',
        type: 'tuple',
        indexed: false,
        internalType: 'struct AuctionCrowdfundBase.AuctionCrowdfundOptions',
        components: [
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
          {
            name: 'auctionId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'market',
            type: 'address',
            internalType: 'contract IMarketWrapper',
          },
          {
            name: 'nftContract',
            type: 'address',
            internalType: 'contract IERC721',
          },
          {
            name: 'nftTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint40',
            internalType: 'uint40',
          },
          {
            name: 'maximumBid',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'splitRecipient',
            type: 'address',
            internalType: 'address payable',
          },
          {
            name: 'splitBps',
            type: 'uint16',
            internalType: 'uint16',
          },
          {
            name: 'initialContributor',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialDelegate',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'minContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'maxContribution',
            type: 'uint96',
            internalType: 'uint96',
          },
          {
            name: 'gateKeeper',
            type: 'address',
            internalType: 'contract IGateKeeper',
          },
          {
            name: 'gateKeeperId',
            type: 'bytes12',
            internalType: 'bytes12',
          },
          {
            name: 'onlyHostCanBid',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'governanceOpts',
            type: 'tuple',
            internalType: 'struct Crowdfund.FixedGovernanceOpts',
            components: [
              {
                name: 'partyImpl',
                type: 'address',
                internalType: 'contract Party',
              },
              {
                name: 'partyFactory',
                type: 'address',
                internalType: 'contract IPartyFactory',
              },
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
            name: 'proposalEngineOpts',
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
      },
      {
        name: 'allowedAuctionsMerkleRoot',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'ERC1167FailedCreateClone',
    inputs: [],
  },
] as const
