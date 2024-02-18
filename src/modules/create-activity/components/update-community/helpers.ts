// Third Parties
import { encodeFunctionData } from 'viem'
import { formatEther } from 'ethers'
import { Address } from 'wagmi'

// Types
import { TransactionType } from '@/modules/create-activity/types'
import { FounderParameters } from '@/types'
type GenerateInitialDataProps = {
  data:
    | [
        bigint,
        bigint,
        `0x${string}`,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        string,
        string,
        readonly {
          wallet: `0x${string}`
          ownershipPct: number
          vestExpiry: number
        }[],
      ]
    | undefined
}

// Helpers
import { BuilderTransaction } from '@/modules/create-activity/stores'
import { fromSeconds, unpackOptionalArray } from '@/utils/helpers'
import { NULL_ADDRESS } from '@/constants/addresses'
import { UpdateCommunityFormValues } from './UpdateCommunity.schema'
import { auctionAbi } from '@/data/contract/abis'

/*--------------------------------------------------------------------*/

/**
 * Helpers
 */

export const withPauseUnpause = (
  transactions: BuilderTransaction[],
  auctionAddress: Address
) => {
  const targetAddresses = transactions
    .flatMap((txn) => txn.transactions)
    .map((txn) => txn.target)

  if (!targetAddresses.includes(auctionAddress)) {
    return transactions
  }

  const pause = {
    type: TransactionType.CUSTOM,
    transactions: [
      {
        functionSignature: 'pause()',
        target: auctionAddress,
        calldata: encodeFunctionData({
          abi: auctionAbi,
          functionName: 'pause',
        }),
        value: '',
      },
    ],
  }

  const unpause = {
    type: TransactionType.CUSTOM,
    transactions: [
      {
        functionSignature: 'unpause()',
        target: auctionAddress,
        calldata: encodeFunctionData({
          abi: auctionAbi,
          functionName: 'unpause',
        }),
        value: '',
      },
    ],
  }

  return [pause, ...transactions, unpause]
}

export const generateInitialData = ({
  data,
}: GenerateInitialDataProps): UpdateCommunityFormValues => {
  const [
    auctionDuration,
    auctionReservePrice,
    vetoer,
    votingPeriod,
    votingDelay,
    quorumVotesBps,
    proposalThresholdBps,
    daoImage,
    daoWebsite,
    description,
    founders,
  ] = unpackOptionalArray(data, 12)

  return {
    /* artwork */
    projectDescription:
      description?.replace(/\\n/g, String.fromCharCode(13, 10)) || '',

    /* metadata */
    daoAvatar: daoImage || '',
    daoWebsite: daoWebsite || '',

    /* governor */
    proposalThreshold: Number(proposalThresholdBps) / 100 || 0,
    quorumThreshold: Number(quorumVotesBps) / 100 || 0,
    votingPeriod: fromSeconds(votingPeriod && BigInt(votingPeriod)),
    votingDelay: fromSeconds(votingDelay && BigInt(votingDelay)),
    founderAllocation:
      (founders as unknown as FounderParameters[])?.map((x: any) => ({
        founderAddress: x.wallet,
        allocationPercentage: x.ownershipPct,
        endDate: new Date(x.vestExpiry * 1000).toISOString().substring(0, 10),
      })) || [],
    vetoPower: !!vetoer && vetoer !== NULL_ADDRESS,
    vetoerAddress: vetoer || '',

    /* auction */
    auctionDuration: fromSeconds(auctionDuration && Number(auctionDuration)),
    auctionReservePrice: auctionReservePrice
      ? parseFloat(formatEther(auctionReservePrice))
      : 0,
  }
}
