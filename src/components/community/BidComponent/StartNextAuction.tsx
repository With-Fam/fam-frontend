'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'

// Local Components'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
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
    console.log('error::', error)
    console.log('handle settle hit')
    if (!!error) return

    setSettling(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setSettling(false)
    } catch (error) {
      console.log('error::', error)
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
