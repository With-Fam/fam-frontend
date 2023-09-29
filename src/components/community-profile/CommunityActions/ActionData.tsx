// Framework
import Image from 'next/image'

// Local Components
import { Paragraph, PoolComponent, UsersRow } from '@/stories'

// Types
interface DataProps {
  item: {
    href: string
    date: string
    title: string
    votes: number
    rejected: boolean
    passed: boolean
    description: string
    users: string[]
    creator: {
      image: string
      name: string
    }
    comments: string[]
  }
}

// Utils
import { formatDate } from '@/utils/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActionData = ({ item }: DataProps): JSX.Element => {
  const { creator, title, date, users, votes, passed, rejected } = item

  return (
    <>
      <div className="mb-2 hidden items-center gap-2 sm:flex">
        <Image
          src={creator.image}
          alt=""
          width={16}
          height={16}
          className="rounded-full object-cover"
        />
        <Paragraph as="p5" className="text-grey">
          by {creator.name}
        </Paragraph>
      </div>
      <Paragraph as="p3" className="mb-1">
        {title}
      </Paragraph>
      <Paragraph as="p5" className="mb-4 text-grey">
        {formatDate(date)}
      </Paragraph>
      <div className="flex">
        <div className="w-max">
          <UsersRow users={users} text={`${votes} Votes`} />
        </div>
        <div className="relative right-0 top-0 flex flex-1 justify-end sm:absolute sm:right-4 sm:top-4">
          <PoolComponent passed={passed} rejected={rejected} />
        </div>
      </div>
    </>
  )
}

export default ActionData
