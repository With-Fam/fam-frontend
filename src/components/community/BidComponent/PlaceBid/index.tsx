'use client'

// Framework
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Third Parties
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  readContract,
} from 'wagmi/actions'
import { useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import useSWR, { useSWRConfig } from 'swr'
import SWR_KEYS from '@/constants/swrKeys'
import { parseEther } from 'viem'
import toast from 'react-hot-toast'

// Local Components
import { QuestionMark } from '@/components/icons'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
const Tooltip = dynamic(() => import('@/components/shared/Tooltip'))

// Types
import type { AddressType } from '@/types'
import { TokenFragment } from '@/data/subgraph/sdk.generated'
type PlaceBidProps = {
  token: TokenFragment
  chainId: number
  highestBid?: bigint
  communityId: string
  auctionAddress: string
}

// Helpers
import { useMinBidIncrement } from '@/components/community/BidComponent/hooks'
import { unpackOptionalArray } from '@/utils/helpers'
import { twMerge } from 'tailwind-merge'
// import { checkIfBidsAreUpdated } from '@/components/community/BidComponent/PlaceBid/actions'
import { formatCryptoVal } from '@/utils/numbers'
import { averageWinningBid } from '@/data/subgraph/requests/averageWinningBid'
import { getBids } from '@/data/subgraph/requests/getBids'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PlaceBid = ({
  token,
  chainId,
  highestBid,
  // communityId,
  auctionAddress,
}: PlaceBidProps): JSX.Element => {
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const { data: balance } = useBalance({ address: address, chainId })
  const { mutate } = useSWRConfig()
  const { addresses } = useDaoStore()

  const [creatingBid, setCreatingBid] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [bidAmount, setBidAmount] = useState<string | undefined>(undefined)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as AddressType,
    chainId,
  }
  const { data } = useContractReads({
    allowFailure: false,
    contracts: [
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...auctionContractParams, functionName: 'minBidIncrement' },
    ] as const,
  })
  const [auctionReservePrice, minBidIncrement] = unpackOptionalArray(data, 2)

  const { minBidAmount } = useMinBidIncrement({
    highestBid,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const { data: averageBid } = useSWR(
    addresses.token
      ? [SWR_KEYS.AVERAGE_WINNING_BID, chainId, addresses.token]
      : undefined,
    () => averageWinningBid(chainId, addresses.token as AddressType)
  )

  const isMinBid = Number(bidAmount) >= minBidAmount
  const formattedMinBid = formatCryptoVal(minBidAmount)
  // const minBidAmountInWei = parseEther(formattedMinBid)

  // Warn users if they are bidding more than 5x the average winning bid or min bid amount
  // const valueToCalculateWarning = averageBid || minBidAmountInWei
  // const minAmountForWarning = valueToCalculateWarning * 5n

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || creatingBid) return

    // const amountInWei = parseEther(bidAmount)

    // if (
    //   amountInWei &&
    //   minAmountForWarning &&
    //   amountInWei > minAmountForWarning
    // ) {
    //   setShowWarning(true)
    //   return
    // }

    await createBidTransaction()
  }

  const createBidTransaction = async () => {
    if (!bidAmount) {
      toast.error('Please enter a bid amount')
      return
    }

    if (Number(bidAmount) < Number(minBidAmount)) {
      toast.error(`Must be at least ${minBidAmount} ETH`)
      return
    }

    try {
      toast.loading('Confirming your bid...')
      setCreatingBid(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: addresses.auction as AddressType,
        functionName: 'createBid',
        args: [BigInt(token.tokenId)],
        value: parseEther(bidAmount),
      })

      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })

      await Promise.all([
        mutate(
          [SWR_KEYS.AUCTION_BIDS, chainId, addresses.token, token.tokenId],
          () => getBids(chainId, addresses.token!, token.tokenId)
        ),
        mutate([SWR_KEYS.AUCTION, chainId, auctionAddress], () =>
          readContract({
            abi: auctionAbi,
            address: auctionAddress as AddressType,
            functionName: 'auction',
            chainId,
          })
        ),
        mutate([SWR_KEYS.AVERAGE_WINNING_BID, chainId, addresses.token], () =>
          averageWinningBid(chainId, addresses.token as AddressType)
        ),
      ])
      toast.dismiss()
      toast.success('Bid succesfully placed!')
      setBidAmount('0')
    } catch (error) {
      toast.dismiss()

      if (error && (error as any).shortMessage) {
        toast.error((error as any).shortMessage)
      } else {
        toast.error('Error placing bid')
      }
    } finally {
      setCreatingBid(false)
      setShowWarning(false)
    }
  }

  return (
    <>
      <div className="mx-auto mb-4 mt-5 flex h-14 w-full max-w-2xl items-center justify-between gap-2 rounded-lg bg-grey-light px-4 py-2">
        <input
          disabled={creatingBid}
          className="mx-2 flex-1 bg-transparent text-center outline-0"
          type="number"
          name="bid-community"
          id="bid-community"
          placeholder={`${minBidAmount} ETH or more`}
          min={formattedMinBid}
          value={bidAmount}
          onChange={(e) => {
            setBidAmount(e.target.value)
          }}
        />
        <Tooltip tooltipContent="Each day a new membership pass is auctioned and proceeds from the auction to go into a shared pool.">
          <QuestionMark />
        </Tooltip>
      </div>
      <button
        type="button"
        className={twMerge(
          'mx-auto mt-8 block h-16 w-full self-center rounded-full py-4',
          creatingBid
            ? 'cursor-not-allowed bg-grey-light text-black opacity-50'
            : 'bg-black text-white'
        )}
        onClick={handleCreateBid}
        disabled={creatingBid}
      >
        {creatingBid ? 'Placing bid...' : 'Place Bid'}
      </button>
    </>
  )
}

export default PlaceBid
