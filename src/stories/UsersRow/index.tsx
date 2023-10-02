// Framework
import Image from 'next/image'

// Types
interface CProps {
  users: string[]
  text: string
}

// Components
import Paragraph from '@/stories/Paragraph'

// Component Prep

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UsersRow = ({ users, text }: CProps): JSX.Element => (
  <div className="flex w-full items-center">
    {users.map((user, index) => {
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
    <Paragraph as="p4" className="ml-1 flex-1 text-right text-grey-dark">
      {text}
    </Paragraph>
  </div>
)

export default UsersRow
