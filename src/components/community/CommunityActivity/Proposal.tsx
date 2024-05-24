import VetoButton from './VetoButton'
import ExecuteButton from './ExecuteButton'
import { Address } from 'viem'

interface ProposalProps {
  proposal: any
  community: Address
}

const Proposal = ({ proposal, community }: ProposalProps): JSX.Element => {
  const proposalId = proposal?.decodedData?.args?.proposalId
  console.log('SWEETS PROPOSAL', proposal)

  return (
    <div className="relative z-0 mb-8 rounded-lg bg-white p-4">
      <div className="flex items-center justify-around gap-4">
        <VetoButton
          proposalId={proposal?.decodedData?.args?.proposalId}
          community={community}
        />
        PARTY PROPOSAL #{proposalId?.toString?.()}
        <ExecuteButton proposal={proposal} community={community} />
      </div>
    </div>
  )
}

export default Proposal
