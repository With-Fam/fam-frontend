// Local Components
import { CheckMark, EyeIcon, Poll, XMark } from '@/components/icons'

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
            <span className="text ml-1.5 text-yellow-dark">
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
}

export default PollComponent
