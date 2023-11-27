'use client'

// Framework
import Image from 'next/image'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'

// Local Components
import { Paragraph } from '@/stories'

// Types
import { Address } from 'wagmi'
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
  className = 'mb-2 hidden items-center gap-2 sm:flex',
}: ActivityCreatorProps): JSX.Element => {
  const { displayName, ensAvatar } = useEnsData(proposer)

  return (
    <div className={className}>
      <div className="relative h-4 w-4">
        {ensAvatar ? (
          <Image
            src={ensAvatar}
            alt=""
            fill
            className="h-4 w-4 rounded-full object-cover"
          />
        ) : (
          <div className="border-dark h-4 w-4 rounded-full border border-solid bg-background" />
        )}
      </div>
      <Paragraph as="p5" className="text-grey">
        by {displayName}
      </Paragraph>
    </div>
  )
}

export default ActivityCreator
