'use client'

// Framework
import dynamic from 'next/dynamic'

// Third Parties
import { Address } from 'wagmi'

// Local Components
import { Paragraph } from '@/stories'
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

// Types
interface ActivityCreatorProps {
  proposer: Address
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityCreator = ({
  proposer,
  className = 'mb-2 items-center gap-2 flex',
}: ActivityCreatorProps): JSX.Element => {
  return (
    <div className={className}>
      <div className="relative h-4 w-4">
        <UserAvatar width={16} height={16} address={proposer} />
      </div>

      <Paragraph as="p5" className="text-grey">
        by <UserName address={proposer} addressFallback />
      </Paragraph>
    </div>
  )
}

export default ActivityCreator
