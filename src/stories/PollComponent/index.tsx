// Local Components
<<<<<<< HEAD
import { CheckMark, EyeIcon, Poll, XMark } from '@/components/icons'

// Types
interface PollProps {
  state?: number | null
}

// Helpers
import { ProposalState } from '@/data/contract/requests/getProposalState'
import { parseState } from '@/stories/PollComponent/helpers'

=======
import { CheckMark, Poll, XMark } from '@/components/icons'

// Types
interface PollProps {
  status?: null | 'passed' | 'rejected'
}

>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */
<<<<<<< HEAD
const PollComponent = ({ state }: PollProps): JSX.Element => {
  const renderState = (state?: number | null) => {
    switch (state) {
      case ProposalState.Succeeded:
        return (
          <>
            <CheckMark />
            <span className="ml-1.5 text-status-green">Passed</span>
          </>
        )
      case ProposalState.Defeated:
        return (
          <>
            <XMark />
            <span className="ml-1.5 text-status-red">Rejected</span>
          </>
        )

      case ProposalState.Active:
        return (
          <>
            <Poll />
            <span className="ml-1.5 text-status-purple">Voting</span>
          </>
        )

      case null || undefined:
        return (
          <>
            <Poll />
            <span className="ml-1.5 text-status-purple">Voting</span>
          </>
        )

      default:
        return (
          <>
            <EyeIcon color="#FFAC31" />
            <span className="text text-yellow-dark ml-1.5">
              {typeof state === 'number' && parseState(state)}
            </span>
          </>
        )
    }
  }

  return (
    <div className="flex items-center justify-center text-sm">
      {renderState(state)}
    </div>
  )
=======
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
>>>>>>> origin/main
}

export default PollComponent
