// Framework
import dynamic from 'next/dynamic'

// Components
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

// Types
interface VoteImageProps {
  voter: string
  marginLeft: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteImage = ({ voter, marginLeft }: VoteImageProps): JSX.Element => (
  <div className={`relative h-6 w-6 ${marginLeft}`}>
    <UserAvatar width={24} height={24} address={voter} />
  </div>
)

export default VoteImage
