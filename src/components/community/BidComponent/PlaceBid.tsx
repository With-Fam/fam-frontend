import { useState } from 'react'
// Local Components

import { useAccount, useContractReads, useContractWrite } from 'wagmi'
import { prepareWriteContract, writeContract } from 'wagmi/actions'
import { parseEther, etherUnits, formatEther } from 'viem'
import { waitForTransaction } from 'wagmi/actions'
import toast from 'react-hot-toast'

import { QuestionMark } from '@/components/icons'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import { formatCryptoVal } from '@/utils/numbers'
import { AddressType, Chain } from '@/types'
import { useMinBidIncrement } from './hooks'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PlaceBid = ({ token }: any): JSX.Element => {
  console.log('token::', token)
  const [bidAmount, setBidAmount] = useState<number>(0)
  const [settling, setSettling] = useState(false)
  const chain = 5 // Hardcoded. Should be passed in from the router
  const addresses = useDaoStore((state) => state.addresses)
  const { tokenId } = token

  // const auctionContractParams = {
  //   abi: auctionAbi,
  //   address: addresses.auction as AddressType,
  //   chainId: chain,
  // }

  // const { data } = useContractReads({
  //   allowFailure: false,
  //   contracts: [
  //     { ...auctionContractParams, functionName: 'reservePrice' },
  //     { ...auctionContractParams, functionName: 'minBidIncrement' },
  //   ] as const,
  // })

  // const reservePrice = data?.[0]
  // const minBidIncrement = data?.[1]

  // console.log('reservePrice::', formatEther(reservePrice))
  // console.log('minBidIncrement::', minBidIncrement)

  // console.log('RESERVE PRICE::', Number(formatEther(reservePrice as any)))
  // console.log('minBidIncrement::', Number(formatEther(minBidIncrement as any)))

  const placeBid = async () => {
    setSettling(true)
    try {
      toast.loading('Loading...')
      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: addresses.auction as AddressType,
        functionName: 'createBid',
        args: [BigInt(tokenId)],
        value: parseEther(bidAmount.toString()),
      })

      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setSettling(false)
      toast.dismiss()
      toast.success('Bid succesfully placed!')
    } catch (error) {
      toast.dismiss()
      toast.error('Error placing bid')
      console.log('error::', error)
      setSettling(false)
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
          placeholder="0.05 ETH or more"
          value={bidAmount}
          onChange={(e) => {
            e.preventDefault()
            console.log('e.target.value::', e.target.value)
            setBidAmount(Number(e.target.value))
          }}
        />
        <QuestionMark />
      </div>
      <button
        type="button"
        className="mx-auto block h-16 w-full self-center rounded-full bg-black py-4 text-white mt-8"
        onClick={placeBid}
      >
        Place Bid
      </button>
    </>
  )
}

export default PlaceBid
