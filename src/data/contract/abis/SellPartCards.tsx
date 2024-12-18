export const sellPartyCartAuthorityAbi = [
  { inputs: [], name: 'ArityMismatch', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'errData', type: 'bytes' },
    ],
    name: 'EthTransferFailed',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint96', name: 'amount', type: 'uint96' },
      { internalType: 'uint96', name: 'remaining', type: 'uint96' },
    ],
    name: 'ExceedsRemainingContributionsError',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
    ],
    name: 'InvalidBpsError',
    type: 'error',
  },
  { inputs: [], name: 'InvalidInitialDelegateError', type: 'error' },
  { inputs: [], name: 'InvalidMessageValue', type: 'error' },
  {
    inputs: [
      { internalType: 'uint96', name: 'minContribution', type: 'uint96' },
      { internalType: 'uint96', name: 'maxContribution', type: 'uint96' },
    ],
    name: 'MinGreaterThanMaxError',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      {
        internalType: 'contract IGateKeeper',
        name: 'gateKeeper',
        type: 'address',
      },
      { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
      { internalType: 'bytes', name: 'gateData', type: 'bytes' },
    ],
    name: 'NotAllowedByGateKeeperError',
    type: 'error',
  },
  { inputs: [], name: 'NotAuthorizedError', type: 'error' },
  { inputs: [], name: 'OnlyPartyHostError', type: 'error' },
  {
    inputs: [
      { internalType: 'uint96', name: 'amount', type: 'uint96' },
      { internalType: 'uint96', name: 'bound', type: 'uint96' },
    ],
    name: 'OutOfBoundsContributionsError',
    type: 'error',
  },
  { inputs: [], name: 'SaleInactiveError', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: 'u256', type: 'uint256' }],
    name: 'Uint256ToUint128CastOutOfRangeError',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'v', type: 'uint256' }],
    name: 'Uint256ToUint96CastOutOfRange',
    type: 'error',
  },
  { inputs: [], name: 'ZeroExchangeRateError', type: 'error' },
  { inputs: [], name: 'ZeroMaxTotalContributionsError', type: 'error' },
  { inputs: [], name: 'ZeroVotingPowerError', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Party',
        name: 'party',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saleId',
        type: 'uint256',
      },
      {
        components: [
          { internalType: 'uint96', name: 'minContribution', type: 'uint96' },
          { internalType: 'uint96', name: 'maxContribution', type: 'uint96' },
          { internalType: 'uint40', name: 'expiry', type: 'uint40' },
          { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
          {
            internalType: 'address payable',
            name: 'fundingSplitRecipient',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'totalContributions',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'maxTotalContributions',
            type: 'uint96',
          },
          { internalType: 'uint160', name: 'exchangeRate', type: 'uint160' },
          {
            internalType: 'contract IGateKeeper',
            name: 'gateKeeper',
            type: 'address',
          },
          { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
        ],
        indexed: false,
        internalType: 'struct SellPartyCardsAuthority.SaleState',
        name: 'state',
        type: 'tuple',
      },
    ],
    name: 'CreatedSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Party',
        name: 'party',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saleId',
        type: 'uint256',
      },
    ],
    name: 'Finalized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Party',
        name: 'party',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saledId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'contributor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'contribution',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initialDelegate',
        type: 'address',
      },
    ],
    name: 'MintedFromSale',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'address', name: 'initialDelegate', type: 'address' },
      { internalType: 'uint96[]', name: 'contributions', type: 'uint96[]' },
      { internalType: 'bytes', name: 'gateData', type: 'bytes' },
    ],
    name: 'batchContribute',
    outputs: [
      { internalType: 'uint96[]', name: 'votingPowers', type: 'uint96[]' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'address[]', name: 'recipients', type: 'address[]' },
      {
        internalType: 'address[]',
        name: 'initialDelegates',
        type: 'address[]',
      },
      { internalType: 'uint96[]', name: 'contributions', type: 'uint96[]' },
      { internalType: 'bytes', name: 'gateData', type: 'bytes' },
    ],
    name: 'batchContributeFor',
    outputs: [
      { internalType: 'uint96[]', name: 'votingPowers', type: 'uint96[]' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'address', name: 'initialDelegate', type: 'address' },
      { internalType: 'bytes', name: 'gateData', type: 'bytes' },
    ],
    name: 'contribute',
    outputs: [{ internalType: 'uint96', name: 'votingPower', type: 'uint96' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'address', name: 'initialDelegate', type: 'address' },
      { internalType: 'bytes', name: 'gateData', type: 'bytes' },
    ],
    name: 'contributeFor',
    outputs: [{ internalType: 'uint96', name: 'votingPower', type: 'uint96' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'uint96', name: 'contribution', type: 'uint96' },
    ],
    name: 'convertContributionToVotingPower',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
      { internalType: 'uint96', name: 'votingPower', type: 'uint96' },
    ],
    name: 'convertVotingPowerToContribution',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint96',
            name: 'pricePerMembership',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'votingPowerPerMembership',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'totalMembershipsForSale',
            type: 'uint96',
          },
          { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
          {
            internalType: 'address payable',
            name: 'fundingSplitRecipient',
            type: 'address',
          },
          { internalType: 'uint40', name: 'duration', type: 'uint40' },
          {
            internalType: 'contract IGateKeeper',
            name: 'gateKeeper',
            type: 'address',
          },
          { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
        ],
        internalType: 'struct SellPartyCardsAuthority.FixedMembershipSaleOpts',
        name: 'opts',
        type: 'tuple',
      },
    ],
    name: 'createFixedMembershipSale',
    outputs: [{ internalType: 'uint256', name: 'saleId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint96', name: 'minContribution', type: 'uint96' },
          { internalType: 'uint96', name: 'maxContribution', type: 'uint96' },
          {
            internalType: 'uint96',
            name: 'maxTotalContributions',
            type: 'uint96',
          },
          { internalType: 'uint160', name: 'exchangeRate', type: 'uint160' },
          { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
          {
            internalType: 'address payable',
            name: 'fundingSplitRecipient',
            type: 'address',
          },
          { internalType: 'uint40', name: 'duration', type: 'uint40' },
          {
            internalType: 'contract IGateKeeper',
            name: 'gateKeeper',
            type: 'address',
          },
          { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
        ],
        internalType:
          'struct SellPartyCardsAuthority.FlexibleMembershipSaleOpts',
        name: 'opts',
        type: 'tuple',
      },
    ],
    name: 'createFlexibleMembershipSale',
    outputs: [{ internalType: 'uint256', name: 'saleId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
    ],
    name: 'finalize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
    ],
    name: 'getFixedMembershipSaleInfo',
    outputs: [
      { internalType: 'uint96', name: 'pricePerMembership', type: 'uint96' },
      {
        internalType: 'uint96',
        name: 'votingPowerPerMembership',
        type: 'uint96',
      },
      { internalType: 'uint96', name: 'totalContributions', type: 'uint96' },
      {
        internalType: 'uint96',
        name: 'totalMembershipsForSale',
        type: 'uint96',
      },
      { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
      {
        internalType: 'address payable',
        name: 'fundingSplitRecipient',
        type: 'address',
      },
      { internalType: 'uint40', name: 'expiry', type: 'uint40' },
      {
        internalType: 'contract IGateKeeper',
        name: 'gateKeeper',
        type: 'address',
      },
      { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
    ],
    name: 'getFlexibleMembershipSaleInfo',
    outputs: [
      { internalType: 'uint96', name: 'minContribution', type: 'uint96' },
      { internalType: 'uint96', name: 'maxContribution', type: 'uint96' },
      { internalType: 'uint96', name: 'totalContributions', type: 'uint96' },
      { internalType: 'uint96', name: 'maxTotalContributions', type: 'uint96' },
      { internalType: 'uint160', name: 'exchangeRate', type: 'uint160' },
      { internalType: 'uint16', name: 'fundingSplitBps', type: 'uint16' },
      {
        internalType: 'address payable',
        name: 'fundingSplitRecipient',
        type: 'address',
      },
      { internalType: 'uint40', name: 'expiry', type: 'uint40' },
      {
        internalType: 'contract IGateKeeper',
        name: 'gateKeeper',
        type: 'address',
      },
      { internalType: 'bytes12', name: 'gateKeeperId', type: 'bytes12' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
      { internalType: 'uint256', name: 'saleId', type: 'uint256' },
    ],
    name: 'isSaleActive',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract Party', name: 'party', type: 'address' },
    ],
    name: 'lastSaleId',
    outputs: [{ internalType: 'uint256', name: 'lastId', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]
