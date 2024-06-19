import { Icon } from '@/components/Icon'
import ProposalStatus from '@/components/community/ProposalStatus'
import EnsAddress from '@/components/shared/EnsAddress'
import { useProposalProvider } from '@/contexts/ProposalProvider'
import useProposalComments from '@/hooks/useProposalComments'
import { Paragraph } from '@/stories'
import getDiffFormattedDuration from '@/utils/getDiffFormattedDuration'
import getProposalStatus from '@/utils/getProposalStatus'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

const Proposal = ({ data }: any) => {
  const { push } = useRouter()
  const { network, community } = useParams()
  const { setProposal } = useProposalProvider() as any

  const status = getProposalStatus(data)

  const { proposalComments } = useProposalComments(community, data.proposalId)

  const goToProposal = () => {
    setProposal(data)
    push(`/community/${network}/${community}/${data.proposalId}`)
  }

  return (
    <section className="rounded-md bg-white p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <UserAvatar address={data.proposerAddress} width={16} height={16} />
          <Paragraph as="p5" className="text-gray-dark">
            <EnsAddress address={data.proposerAddress} />
          </Paragraph>
          <p className="font-abc text-[12px] text-grey">
            {getDiffFormattedDuration(Date.now(), data.proposedTime * 1000)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ProposalStatus status={status} />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="font-abcMedium text-black"
          type="button"
          onClick={goToProposal}
        >
          {data.name}
        </button>
        <div className="rounded-full bg-orange-light px-3 py-1">
          <p className="text-[12px] text-orange">23hr 14m</p>
        </div>
      </div>
      <Paragraph as="p4" className="mt-4 font-abcMedium">
        {`PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`}
      </Paragraph>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center gap-1">
          <Icon id="check" fill="#45D039" />
          <Paragraph as="p5" className="text-grey">
            {data.votes.length} Votes
          </Paragraph>
        </div>
        <div className="flex items-center gap-1">
          <Icon id="comment" fill="#ffffff" />
          <Paragraph as="p5" className="text-grey">
            {proposalComments?.length} comments
          </Paragraph>
        </div>
      </div>
    </section>
  )
}

export default Proposal
