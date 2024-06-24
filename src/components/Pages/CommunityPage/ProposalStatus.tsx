import { Icon } from '@/components/Icon'
import { PROPOSAL_STATUS } from '@/hooks/useProposalData'
import { Paragraph } from '@/stories'

const ProposalStatus = ({ status }: any) => {
  return (
    <div className="flex items-center items-center">
      {status === PROPOSAL_STATUS.Voting && (
        <>
          <Paragraph as="p5" className="text-status-purple">
            Voting
          </Paragraph>
        </>
      )}
      {status === PROPOSAL_STATUS.Passed && (
        <>
          <Paragraph as="p5" className="text-status-purple">
            Passed
          </Paragraph>
        </>
      )}
      {status === PROPOSAL_STATUS.Ready && (
        <>
          <Paragraph as="p5" className="text-status-purple">
            Ready
          </Paragraph>
        </>
      )}
      {status === PROPOSAL_STATUS.Defeated && (
        <>
          <Paragraph as="p5" className="text-red">
            Defeated
          </Paragraph>
        </>
      )}
      {status === PROPOSAL_STATUS.Complete && (
        <>
          <Icon id="check" fill="#45D039" />
          <Paragraph as="p5" className="text-status-green">
            Completed
          </Paragraph>
        </>
      )}
    </div>
  )
}

export default ProposalStatus