// Local Components
import { Paragraph } from '@/stories'
import { ChatBox } from '@/components/icons'

// Types
interface CommentsProps {
  comments: string[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActionsComments = ({ comments }: CommentsProps): JSX.Element => {
  return (
    <div className="hidden cursor-pointer sm:flex">
      <ChatBox />
      <Paragraph as="p5" className="ml-1 text-grey">
        {comments.length} comments
      </Paragraph>
    </div>
  )
}

export default ActionsComments
