'use client'

// Framework
import Image from 'next/image'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'

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
      {ensAvatar ? (
        <Image
          src={ensAvatar}
          alt=""
          width={24}
          height={24}
          className="h-full w-full overflow-hidden rounded-full object-cover"
        />
      ) : (
        <div className="border-dark h-6 w-6 rounded-full border border-solid bg-background" />
      )}
    </div>
  )
}

export default VoteImage
