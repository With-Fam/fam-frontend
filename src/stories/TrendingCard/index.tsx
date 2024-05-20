// Framework
import Image from 'next/image'
import Link from 'next/link'

<<<<<<< HEAD
import { type CommunityProps } from '@/utils/explore/communities'

// Components
import Paragraph from '@/stories/Paragraph'
import { MemberIcon } from '@/components/icons'
=======
// Types
interface CProps {
  image: string
  imageAlt: string
  title: string
  value: string
  users: string[]
  text: string
  href: string
}

// Components
import Paragraph from '@/stories/Paragraph'
import UsersRow from '@/stories/UsersRow'
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TrendingCard = ({
  image,
  title,
  value,
  users,
  text,
  imageAlt,
<<<<<<< HEAD
  slug,
}: CommunityProps): JSX.Element => (
  <Link
    className="col-span-1 block w-auto"
    href={`/community/${slug}`}
    passHref
  >
=======
  href,
}: CProps): JSX.Element => (
  <Link className="col-span-1 block w-auto" href={href} passHref>
>>>>>>> origin/main
    <div className="relative aspect-square w-full">
      <Image
        className="mx-auto h-auto w-full overflow-hidden rounded-lg object-cover"
        fill
        src={image}
        alt={imageAlt}
        sizes="50vw"
      />
    </div>
    <div className="flex justify-between py-3">
      <Paragraph as="p3">{title}</Paragraph>
      <Paragraph as="p3">{value}</Paragraph>
    </div>
<<<<<<< HEAD
    <div className="flex">
      <div className=''>
        <MemberIcon />
      </div>
      <Paragraph as="p4" className="text-grey-dark">
        {users.length} members
      </Paragraph>
    </div>
=======
    <UsersRow users={users} text={text} />
>>>>>>> origin/main
  </Link>
)

export default TrendingCard
