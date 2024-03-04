'use client'

// Framework
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Third Parties
import { useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

// Helpers
import { useDaoStore } from '@/modules/dao'
import { auctionAbi } from '@/data/contract/abis'
import { Paragraph } from '@/stories'
import { StarIcon } from '@/components/icons'

// Types
type PreAuctionProps = {
  chainId: number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PreAuction = ({ chainId }: PreAuctionProps): JSX.Element => {
  const [loading, setIsLoading] = useState(false)
  const [started, setStarted] = useState(false)
  // const [fade, setFade] = useState(false)
  const addresses = useDaoStore((state) => state.addresses)
  const router = useRouter()
  const address = addresses?.auction

  const fields = {
    enabled: !!address,
    abi: auctionAbi,
    address,
    functionName: 'unpause',
    chainId,
  }

  const { writeAsync } = useContractWrite(fields as any)

  const handleStartAuction = async () => {
    setIsLoading(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) {
        await waitForTransaction({ hash: tx.hash })
        setTimeout(() => {
          setStarted(true)
          setIsLoading(false)
        }, 2000)
      }
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      return
    }
  }

  useEffect(() => {
    if (started) {
      router.refresh()
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }, [started, router])

  return (
    <div className="px-4">
      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center rounded-2xl border border-solid border-grey-light px-4 py-6">
        <div className="rounded-lg bg-grey-light p-3">
          <StarIcon color="#F54D18" className="h-10 w-10" />
        </div>
        <Paragraph
          as="p3"
          className="leading[1.2] mt-4 text-center text-grey-dark"
        >
          To get started, kick off your first auction
        </Paragraph>
        {loading ? (
          <button
            type="button"
            className=" mx-auto mt-8 block h-8 w-max self-center rounded-full bg-black px-4 text-sm leading-[1.15] text-white"
            disabled
          >
            Loading...
          </button>
        ) : (
          <button
            type="button"
            className=" mx-auto mt-8 block h-8 w-max self-center rounded-full bg-black px-4 text-sm leading-[1.15] text-white"
            onClick={() => handleStartAuction()}
          >
            Start Auction
          </button>
        )}
      </div>
    </div>
  )
}

export default PreAuction
