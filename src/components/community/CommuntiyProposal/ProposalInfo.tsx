import useProposalInfo from '@/hooks/useProposalInfo'
import { TransactionType } from '@/modules/create-activity/types'
import ZoraProposal from '@/components/community/CommuntiyProposal/ZoraProposal'
import SendEth from '@/components/community/CommuntiyProposal/SendEth'

const ProposalInfo = ({ proposal }: any) => {
  const { proposalInfo } = useProposalInfo(proposal)

  return (
    <div className="mt-8">
      {(proposalInfo?.type === TransactionType.ZORA_COLLECT || proposalInfo?.type === TransactionType.ZORA_CREATE) && (
        <ZoraProposal info={proposalInfo} />
      )}
      {proposalInfo?.type === TransactionType.SEND_ETH && (
        <SendEth info={proposalInfo} />
      )}
    </div>
  )
}

export default ProposalInfo
