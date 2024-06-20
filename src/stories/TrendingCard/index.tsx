// Framework
import Image from 'next/image'
import Link from 'next/link'

import { type CommunityProps } from '@/lib/explore/communities'

// Components
import Paragraph from '@/stories/Paragraph'
import { MemberIcon } from '@/components/icons'

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
  slug,
}: CommunityProps): JSX.Element => (
  <Link
    className="col-span-1 block w-auto"
    href={`/community/${slug}`}
    passHref
  >
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
    <div className="flex">
      <div className="">
        <MemberIcon />
      </div>
      <Paragraph as="p4" className="text-grey-dark">
        {users.length} members
      </Paragraph>
    </div>
  </Link>
)

export default TrendingCard
