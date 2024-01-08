'use client'
import { useState, FC } from 'react'
// Local Components

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
// import { readContract } from 'wagmi/actions'
import { waitForTransaction } from 'wagmi/actions'
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PreAuction: FC = () => {
  const [loading, setIsLoading] = useState(false)
  const chain = 5 // Hardcoded. Should be passed in from the router
  const addresses = useDaoStore((state) => state.addresses)

  const address = addresses?.auction

  const fields = {
    enabled: !!address,
    abi: auctionAbi,
    address,
    functionName: 'unpause',
    chainId: chain,
  }

  // USEPREPARECONTRACTWRITE NOT WORKING. LOOK INTO FIX!!!!

  //   const { config, error } = usePrepareContractWrite(
  //     !!addresses?.auction && (fields as any)
  //   )

  const { writeAsync } = useContractWrite(fields as any)

  const handleStartAuction = async () => {
    console.log('handle start')
    setIsLoading(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      return
    }

    // const auction = await readContract({
    //   address: addresses.auction!,
    //   abi: auctionAbi,
    //   functionName: 'auction',
    //   chainId: chain,
    // })

    window.location.reload()
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 className="text-2xl font-bold">Pre-Auction</h2>
      {loading ? (
        <button
          type="button"
          className="mx-auto mt-8 block h-16 w-[350px] self-center rounded-full bg-black py-4 text-white"
          disabled
        >
          Loading...
        </button>
      ) : (
        <button
          type="button"
          className="mx-auto mt-8 block h-16 w-[350px] self-center rounded-full bg-black py-4 text-white"
          onClick={() => handleStartAuction()}
        >
          Start Auction
        </button>
      )}
    </div>
  )
}

export default PreAuction
