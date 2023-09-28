// Framework
import Image from 'next/image'
import Link from 'next/link'

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
  href,
}: CProps): JSX.Element => {
  return (
    <Link className="col-span-1 block w-auto" href={href} passHref>
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
      <UsersRow users={users} text={text} />
    </Link>
  )
}

export default TrendingCard
