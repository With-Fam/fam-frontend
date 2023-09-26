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

// Component Prep

const UserImages = ({ children }: { children: string[] }) => {
  return (
    <div className="flex">
      {children.map((user, index) => {
        const marginLeft = `relative h-6 w-6 ${index > 0 ? '-ml-2' : ''}`
        return (
          <div key={user} className={marginLeft}>
            <Image
              src={user}
              alt=""
              width={24}
              height={24}
              className="h-full w-full overflow-hidden rounded-full object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}

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
}: CProps) => {
  return (
    <Link className="block w-max" href={href} passHref>
      <Image
        className="mx-auto h-[224px] w-[240px] overflow-hidden rounded-lg object-cover"
        src={image}
        alt={imageAlt}
        width={240}
        height={224}
      />
      <div>
        <div className="flex justify-between py-3">
          <Paragraph as="p3">{title}</Paragraph>
          <Paragraph as="p3">{value}</Paragraph>
        </div>
        <UsersRow users={users} text={text} />
      </div>
    </Link>
  )
}

export default TrendingCard
