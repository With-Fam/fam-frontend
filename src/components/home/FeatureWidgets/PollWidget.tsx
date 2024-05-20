// Local Components
import { UsersRow, PollComponent } from '@/stories'

// Types
interface EProps {
  text?: string
  users?: string[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PollWidget = ({ text, users }: EProps): JSX.Element => (
<<<<<<< HEAD
  <div className="mx-auto my-12 flex w-72 gap-2 p-3.5 shadow-card">
=======
  <div className="mx-auto my-9 flex w-72 gap-2 p-3.5 shadow-card">
>>>>>>> origin/main
    <div>{users && text && <UsersRow users={users} text={text} />}</div>
    <PollComponent />
  </div>
)

export default PollWidget
