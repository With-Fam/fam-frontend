// Local Components
import { CheckMark, Poll, XMark } from '@/components/icons'

// Types
interface PoolProps {
  passed?: boolean
  rejected?: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const PoolComponent = ({ passed, rejected }: PoolProps): JSX.Element => {
  if (passed) {
    return (
      <div className="flex items-center justify-center">
        <CheckMark />
        <span className="ml-1.5 text-status-green">Passed</span>
      </div>
    )
  }

  if (rejected) {
    return (
      <div className="flex items-center justify-center">
        <XMark />
        <span className="ml-1.5 text-status-red">Rejected</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <Poll />
      <span className="ml-1.5 text-status-purple">Voting</span>
    </div>
  )
}

export default PoolComponent
