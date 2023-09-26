// Framework
import Image from 'next/image'

// Local Components
import Paragraph from '@/stories/Paragraph'
import UsersRow from '@/stories/UsersRow'

// Types
interface EProps {
  text?: string
  image?: string
  title?: string
  users?: string[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityWidget = ({ text, image, title, users }: EProps) => {
  return (
    <div className="shadow-card mx-auto my-12 flex w-72 gap-2 p-3.5">
      {image && (
        <Image
          src={image}
          alt=""
          width={40}
          height={40}
          className="h-14 w-14 overflow-hidden rounded-lg object-cover"
        />
      )}
      <div>
        <Paragraph as="p3" className="mb-2">
          {title}
        </Paragraph>
        {users && text && <UsersRow users={users} text={text} />}
      </div>
    </div>
  )
}

export default CommunityWidget
