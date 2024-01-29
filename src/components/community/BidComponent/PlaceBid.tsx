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
} from 'wagmi/actions'
import { useContractReads } from 'wagmi'
import { parseEther } from 'viem'
import toast from 'react-hot-toast'

// Local Components
import { QuestionMark } from '@/components/icons'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
const Tooltip = dynamic(() => import('@/components/shared/Tooltip'))

// Types
import type { AddressType, Maybe } from '@/types'
import { AuctionBid, TokenFragment } from '@/data/subgraph/sdk.generated'
type PlaceBidProps = {
  token: TokenFragment
  chainId: number
  highestBid: Maybe<AuctionBid> | undefined
}

// Helpers
import { useMinBidIncrement } from '@/components/community/BidComponent/hooks'
import { unpackOptionalArray } from '@/utils/helpers'
import { twMerge } from 'tailwind-merge'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PlaceBid = ({
  token,
  chainId,
  highestBid,
}: PlaceBidProps): JSX.Element => {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const addresses = useDaoStore((state) => state.addresses)
  const { tokenId } = token

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as AddressType,
    chainId: chainId,
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
    highestBid: highestBid?.amount,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const placeBid = async () => {
    if (!bidAmount) {
      toast.error('Please enter a bid amount')
      return
    }

    if (Number(bidAmount) < Number(minBidAmount)) {
      toast.error(`Bid amount must be at least ${minBidAmount} ETH`)
      return
    }

    try {
      toast.loading('Loading...')
      setLoading(true)
      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: addresses.auction as AddressType,
        functionName: 'createBid',
        args: [BigInt(tokenId)],
        value: parseEther(bidAmount),
      })

      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      toast.dismiss()
      toast.success('Bid succesfully placed!')
      setLoading(false)
      setTimeout(() => {
        router.refresh()
      }, 300)
    } catch (error) {
      toast.dismiss()

      if (error && (error as any).shortMessage) {
        toast.error((error as any).shortMessage)
      } else {
        toast.error('Error placing bid')
      }
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <div className="mx-auto mb-4 mt-5 flex h-14 w-full max-w-2xl items-center justify-between gap-2 rounded-lg bg-grey-light px-4 py-2">
        <input
          className="mx-2 flex-1 bg-transparent text-center outline-0"
          type="number"
          name="bid-community"
          id="bid-community"
          placeholder={`${minBidAmount} ETH or more`}
          value={bidAmount}
          onChange={(e) => {
            e.preventDefault()
            console.log('e.target.value::', e.target.value)
            setBidAmount(e.target.value)
          }}
        />
        <Tooltip
          tooltipContent={
            <>
              Each day a new membership pass is auctioned and proceeds from the
              auction to go into a shared pool. Read more about auctions{' '}
              <a href="/">here</a>
            </>
          }
        >
          <QuestionMark />
        </Tooltip>
      </div>
      <button
        type="button"
        className={twMerge(
          'mx-auto mt-8 block h-16 w-full self-center rounded-full py-4',
          loading
            ? 'cursor-not-allowed bg-grey-light text-black opacity-50'
            : 'bg-black text-white'
        )}
        onClick={placeBid}
        disabled={loading}
      >
        {loading ? 'Waiting approval...' : 'Place Bid'}
      </button>
    </>
  )
}

export default PlaceBid
