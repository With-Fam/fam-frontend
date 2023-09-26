// Local Components
import UsersRow from '@/stories/UsersRow'

// Content
import Poll from '@/components/icons/Poll'

// Types
interface EProps {
  text?: string
  users?: string[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PollWidget = ({ text, users }: EProps) => (
  <div className="shadow-card mx-auto my-12 flex w-72 gap-2 p-3.5">
    <div>{users && text && <UsersRow users={users} text={text} />}</div>
    <div className="flex items-center justify-center">
      <Poll />
      <span className="ml-1.5 text-status-purple">Voting</span>
    </div>
  </div>
)

export default PollWidget
