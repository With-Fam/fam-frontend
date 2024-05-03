'use client'

// Framework
import { useState } from 'react'

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

  const isWinner = owner != undefined

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
      disabled={settling}
    >
      {isWinner ? 'Claim membership' : 'Start next auction'}
    </button>
  )
}

export default StartNextAuction
