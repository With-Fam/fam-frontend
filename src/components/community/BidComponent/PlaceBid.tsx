'use client'

// Framework
import { useState } from 'react'

// Third Parties
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from 'wagmi/actions'
import { useNetwork, useContractReads } from 'wagmi'
import { parseEther } from 'viem'
import toast from 'react-hot-toast'

// Local Components
import { QuestionMark } from '@/components/icons'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'

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

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PlaceBid = ({ token, chainId, highestBid }: PlaceBidProps): JSX.Element => {
  const [bidAmount, setBidAmount] = useState<string>('')
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
    } catch (error) {
      toast.dismiss()
      toast.error('Error placing bid')
      console.log('error::', error)
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
        <QuestionMark />
      </div>
      <button
        type="button"
        className="mx-auto mt-8 block h-16 w-full self-center rounded-full bg-black py-4 text-white"
        onClick={placeBid}
      >
        Place Bid
      </button>
    </>
  )
}

export default PlaceBid
