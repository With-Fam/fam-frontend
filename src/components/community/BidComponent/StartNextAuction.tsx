'use client'

// Framework
import { useState } from 'react'

// Local Components'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import {
  useAccount,
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
  owner?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const StartNextAuction = ({ chainId, owner }: BidStatusProps): JSX.Element => {
  // const router = useRouter()
  const [settling, setSettling] = useState(false)
  const addresses = useDaoStore((state) => state.addresses)
  const { address } = useAccount()

  const isWinner = owner != undefined && address == owner

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
    setSettling(true)
    toast.loading('settling auction...')
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })

      setSettling(false)
      toast.dismiss()
      toast.success('Settled successfully')
      // setTimeout(() => {
      //   router.refresh()
      // }, 300)
    } catch (error: any) {
      console.log('error::', error)
      toast.dismiss()
      toast.error('Something went wrong. Try Again.')
      setSettling(false)
    }
  }

  if (settling) {
    return (
      <button className="disabled mx-auto mt-8 block h-16 w-full self-center rounded-full bg-black py-4 text-white">
        Start next auction
      </button>
    )
  }
  return (
    <button
      className="mx-auto mt-8 block h-16 w-full self-center rounded-full bg-black py-4 text-white"
      onClick={handleSettle}
      disabled={settling}
    >
      {isWinner ? 'Claim membership' : 'Start next auction'}
    </button>
  )
}

export default StartNextAuction
