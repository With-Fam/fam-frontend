import AddComment from '@/components/community/CommuntiyProposal/AddComment'
import { UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import useProposalComments from '@/hooks/useProposalComments'
import getDiffFormattedDuration from '@/utils/getDiffFormattedDuration'
import { useParams } from 'next/navigation'

const ProposalComments = ({ proposal }: any) => {
  const { community } = useParams()

  const { proposalComments, getProposalComments } = useProposalComments(
    community,
    proposal.proposalId
  )

  const addComment = async () => {
    getProposalComments()
  }

  return (
    <>
      <AddComment proposalId={proposal.proposalId} onClick={addComment} />
      <div className="mt-4 space-y-6">
        {proposalComments.map((comment: any) => (
          <div className="flex justify-between" key={comment.id}>
            <div className="flex gap-2">
              <UserAvatar
                address={comment.signerAddress}
                width={24}
                height={24}
              />
              <div className="font-abcMedium">
                <EnsAddress address={comment.signerAddress} />
                <p>{comment.message}</p>
              </div>
            </div>
            <p>
              {getDiffFormattedDuration(
                Date.now(),
                new Date(comment.createdAt).getTime()
              )}{' '}
              ago
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProposalComments
