'use client'

// Framework
import Image from 'next/image'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'
import { UserAvatar } from '@/components/shared'

// Types
interface VoteImageProps {
  voter: string
  marginLeft: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteImage = ({ voter, marginLeft }: VoteImageProps): JSX.Element => {
  const { ensAvatar } = useEnsData(voter)
  return (
    <div className={`relative h-6 w-6 ${marginLeft}`}>
      <UserAvatar
        ensAvatar={ensAvatar}
        width={24}
        height={24}
        address={voter}
      />
    </div>
  )
}

export default VoteImage
