'use client'

// Framework
import { useState } from 'react'

// Third Parties

// Local Components'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { TransactionExecutionError } from 'viem'
import toast from 'react-hot-toast'
import { waitForTransaction } from 'wagmi/actions'

// Types
import { CurrentAuctionFragment } from '@/data/subgraph/sdk.generated'
type BidStatusProps = {
  page: CurrentAuctionFragment
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const StartNextAuction = ({ page }: BidStatusProps): JSX.Element => {
  const [settling, setSettling] = useState(false)
  const chain = 5 // Hardcoded. Should be passed in from the router
  const addresses = useDaoStore((state) => state.addresses)

  const { data: paused } = useContractRead({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    chainId: chain,
    abi: auctionAbi,
    functionName: 'paused',
  })

  const { config, error } = usePrepareContractWrite({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    abi: auctionAbi,
    functionName: paused ? 'settleAuction' : 'settleCurrentAndCreateNewAuction',
  })

  const { writeAsync } = useContractWrite(config)

  const handleSettle = async () => {
    if (!!error) return
    console.log('ERROR!!!')
    setSettling(true)
    toast.loading('Loading...')
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setSettling(false)
      toast.dismiss()
      toast.success('Auction settled successfully')
    } catch (error: any) {
      toast.dismiss()
      toast.error('Something went wrong. Try Again.')
      setSettling(false)
    }
  }

  if (settling) {
    return (
      <div>
        <button className="disabled mx-auto block h-16 w-full self-center rounded-full bg-black py-4 text-white md:max-w-xs">
          Start next auction
        </button>
      </div>
    )
  }
  return (
    <div>
      <button
        className="mx-auto block h-16 w-full self-center rounded-full bg-black py-4 text-white md:max-w-xs"
        onClick={handleSettle}
      >
        Start next auction
      </button>
    </div>
  )
}

export default StartNextAuction
