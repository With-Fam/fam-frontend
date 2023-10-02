// Local Components
import { CheckMark, Poll, XMark } from '@/components/icons'

// Types
interface PollProps {
  status?: null | 'passed' | 'rejected'
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const PollComponent = ({ status }: PollProps): JSX.Element => {
  switch (status) {
    case 'passed':
      return (
        <div className="flex items-center justify-center">
          <CheckMark />
          <span className="ml-1.5 text-status-green">Passed</span>
        </div>
      )
    case 'rejected':
      return (
        <div className="flex items-center justify-center">
          <XMark />
          <span className="ml-1.5 text-status-red">Rejected</span>
        </div>
      )

    default:
      return (
        <div className="flex items-center justify-center">
          <Poll />
          <span className="ml-1.5 text-status-purple">Voting</span>
        </div>
      )
  }
}

export default PollComponent
