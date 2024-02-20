'use client'

// Framework
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Local Components'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import toast from 'react-hot-toast'
import { waitForTransaction } from 'wagmi/actions'

// Types
import { CHAIN_ID } from '@/types'
type BidStatusProps = {
  chainId: CHAIN_ID
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const StartNextAuction = ({ chainId }: BidStatusProps): JSX.Element => {
  const router = useRouter()
  const [settling, setSettling] = useState(false)
  const addresses = useDaoStore((state) => state.addresses)

  const { data: paused } = useContractRead({
    enabled: !!addresses?.auction,
    address: addresses?.auction,
    chainId,
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
      setTimeout(() => {
        router.refresh()
      }, 300)
    } catch (error: any) {
      toast.dismiss()
      toast.error('Something went wrong. Try Again.')
      setSettling(false)
    }
  }

  if (settling) {
    return (
      <button className="disabled mx-auto block h-16 w-full self-center rounded-full bg-black py-4 text-white mt-8">
        Start next auction
      </button>
    )
  }
  return (
    <button
      className="mx-auto block h-16 w-full self-center rounded-full bg-black py-4 text-white mt-8"
      onClick={handleSettle}
    >
      Start next auction
    </button>
  )
}

export default StartNextAuction