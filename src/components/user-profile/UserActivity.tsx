// Local Components
import { Paragraph } from '@/stories'

// Types
interface UserActivityProps {
  activity: {
    type: string
    name: string
    time: string
    votedStatus?: string
  }
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserActivity = ({ activity }: UserActivityProps): JSX.Element => {
  const { type, name, time, votedStatus } = activity

  return (
    <>
      <div className="flex rounded-lg bg-white p-4">
        <div className="flex w-full justify-between">
          {type === 'vote' && (
            <Paragraph as="p5" className="flex">
              <span>Voted</span>
              {votedStatus === 'up' ? (
                <span className="mx-1 text-status-green">Yes</span>
              ) : (
                <span className="mx-1 text-status-red">No</span>
              )}
              <span className="mr-1">on</span>
            </Paragraph>
          )}
          {type === 'created' && (
            <Paragraph as="p5" className=" pr-1">
              Created
            </Paragraph>
          )}
          <Paragraph
            as="p5"
            className="w-full truncate pr-4 text-left font-abcMedium"
          >
            {name}
          </Paragraph>
          <Paragraph as="p5" className="whitespace-nowrap text-grey">
            {time}
          </Paragraph>
        </div>
      </div>
    </>
  )
}

export default UserActivity
