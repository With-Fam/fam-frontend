'use client'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'
import { formatEther } from 'ethers'

// Components
import { Paragraph } from '@/stories'

// Types
type RenderBiddersProps = {
  address: string
  amount: string
}

// Helpers
import { walletSnippet } from '@/utils/helpers'
import { UserAvatar } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RenderBidders = ({
  address,
  amount,
}: RenderBiddersProps): JSX.Element => {
  const { ensAvatar, ensName } = useEnsData(address)
  const userName = ensName || walletSnippet(address)

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <UserAvatar
          ensAvatar={ensAvatar}
          width={24}
          height={24}
          address={address}
        />
        <Paragraph as="p5" className="h-min text-grey-dark">
          {userName}
        </Paragraph>
      </div>
      <Paragraph as="p5" className="text-grey-dark">
        {formatEther(amount)} ETH
      </Paragraph>
    </div>
  )
}

export default RenderBidders
