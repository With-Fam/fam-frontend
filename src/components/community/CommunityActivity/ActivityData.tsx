// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph, PollComponent, UsersRow } from '@/stories'

// Types
import { ActionsDataProps } from '@/types/create-community'
interface DataProps {
  item: ActionsDataProps
}

// Utils
import { formatDate } from '@/utils/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityData = ({ item }: DataProps): JSX.Element => {
  const { id, creator, title, date, users, votes, status } = item
  return (
    <>
      <div className="mb-2 hidden items-center gap-2 sm:flex">
        <div className="relative h-4 w-4">
          <Image
            src={creator.image}
            alt=""
            fill
            className="h-4 w-4 rounded-full object-cover"
          />
        </div>
        <Paragraph as="p5" className="text-grey">
          by {creator.name}
        </Paragraph>
      </div>
      <Link href={`/community/activity/${id}`} passHref>
        <Paragraph as="p3" className="mb-1">
          {title}
        </Paragraph>
      </Link>
      <Paragraph as="p5" className="mb-4 text-grey">
        {formatDate(date)}
      </Paragraph>
      <div className="flex">
        <div className="w-max">
          <UsersRow users={users} text={`${votes} Votes`} />
        </div>
        <div className="relative right-0 top-0 flex flex-1 justify-end sm:absolute sm:right-4 sm:top-4">
          <PollComponent status={status} />
        </div>
      </div>
    </>
  )
}

export default ActivityData
