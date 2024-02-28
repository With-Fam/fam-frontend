'use client'

// Third Parties
import dynamic from 'next/dynamic'

// Third Parties
import { formatEther } from 'ethers'

// Components
import { Paragraph } from '@/stories'
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

// Types
type RenderBiddersProps = {
  address: `0x${string}`
  amount: string
}

// Helpers
import { UserAvatar } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RenderBidders = ({
  address,
  amount,
}: RenderBiddersProps): JSX.Element => (
  <div className="flex justify-between">
    <div className="flex items-center gap-2">
      <UserAvatar width={24} height={24} address={address} />
      <UserName address={address} className="h-min text-grey-dark" />
    </div>
    <Paragraph as="p5" className="text-grey-dark">
      {amount} ETH
    </Paragraph>
  </div>
)

export default RenderBidders
