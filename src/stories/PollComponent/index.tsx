// Local Components
import { CheckMark, Poll, XMark } from '@/components/icons'

// Types
interface PollProps {
  state?: number | null
}

// Helpers
import { ProposalState } from '@/data/contract/requests/getProposalState'
import { parseState } from '@/stories/PollComponent/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const PollComponent = ({ state }: PollProps): JSX.Element => {
  switch (state) {
    case ProposalState.Succeeded:
      return (
        <div className="flex items-center justify-center">
          <CheckMark />
          <span className="ml-1.5 text-status-green">Passed</span>
        </div>
      )
    case ProposalState.Defeated:
      return (
        <div className="flex items-center justify-center">
          <XMark />
          <span className="ml-1.5 text-status-red">Rejected</span>
        </div>
      )

    case ProposalState.Active:
      return (
        <div className="flex items-center justify-center">
          <Poll />
          <span className="ml-1.5 text-status-purple">Voting</span>
        </div>
      )

      case null || undefined:
      return (
        <div className="flex items-center justify-center">
          <Poll />
          <span className="ml-1.5 text-status-purple">Voting</span>
        </div>
      )

    default:
      return (
        <div className="flex items-center justify-center">
          <span className="ml-1.5 text-grey-dark">{state && parseState(state)}</span>
        </div>
      )
  }
}

export default PollComponent
