// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface UserCommunityProps {
  community: {
    href: string
    name: string
    joinedDate: string
    votes: number
    image: {
      href: string
      alt: string
    }
  }
}

// Utils
import { formatDate } from '@/utils/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserCommunity = ({ community }: UserCommunityProps): JSX.Element => {
  const { image, name, votes, joinedDate, href } = community

  return (
    <Link href={href} passHref>
      <div className="rounded-2xl bg-white p-3">
        <Image
          src={image.href}
          alt={image.alt}
          width={320}
          height={300}
          className="rounded-lg object-cover h-80 w-80"
        />
        <Paragraph as="p3" className="pb-2 pt-3">
          {name}
        </Paragraph>
        <div className="flex justify-between">
          <Paragraph as="p4" className="text-grey">
            {votes} votes
          </Paragraph>
          <Paragraph as="p4" className="text-grey">
            Joined {formatDate(joinedDate)}
          </Paragraph>
        </div>
      </div>
    </Link>
  )
}

export default UserCommunity
