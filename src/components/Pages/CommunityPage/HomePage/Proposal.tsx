import React, { useState, useEffect } from 'react'
import { Icon } from '@/components/Icon'
import ProposalStatus from '@/components/Pages/CommunityPage/ProposalStatus'
import EnsAddress from '@/components/shared/EnsAddress'
import { useProposalProvider } from '@/contexts/ProposalProvider'
import useProposalComments from '@/hooks/useProposalComments'
import { Paragraph } from '@/stories'
import getProposalStatus from '@/lib/getProposalStatus'
import { useParams, useRouter } from 'next/navigation'
import useVotingStatus from '@/hooks/useVotingStatus'
import VoteCountdown from '@/components/Pages/CommunityPage/HomePage/VoteCountdown'
import MemberImage from '@/components/Pages/CommunityPage/MemberImage'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import truncateAddress from '@/lib/truncateAddress'

const formatElapsedTime = (proposedTime: number) => {
  const now = Date.now()
  const elapsed = now - proposedTime * 1000

  const oneMinutes = 1000 * 60
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = 7 * 24 * 60 * 60 * 1000
  const oneMonth = 4 * 7 * 24 * 60 * 60 * 1000

  const hours = Math.floor(elapsed / 60 / oneMinutes)
  const days = Math.floor(elapsed / oneDay)
  const weeks = Math.floor(elapsed / oneWeek)
  const months = Math.floor(elapsed / oneMonth)

  if (elapsed < oneMinutes) {
    return '< 1m ago'
  } else if (elapsed < oneDay) {
    return `${hours}h ago`
  } else if (elapsed < oneWeek) {
    return `${days}d ago`
  } else if (elapsed < oneMonth) {
    return `${weeks}w ago`
  } else {
    return `${months}mo ago`
  }
}

const Proposal = ({ data, proposalIndex }: any) => {
  const [elapsedTime, setElapsedTime] = useState(
    formatElapsedTime(data.proposedTime)
  )
  const { push } = useRouter()
  const { network, community } = useParams()
  const { setSelectedProposalIndex, proposals } = useProposalProvider() as any
  const { isActiveVoting } = useVotingStatus(data)
  const status = getProposalStatus(data)
  const { proposalComments } = useProposalComments(community, data.proposalId)
  const { avatars } = useCommunityProvider() as any

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(formatElapsedTime(data.proposedTime))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [data.proposedTime])

  const goToProposal = () => {
    setSelectedProposalIndex(proposalIndex)
    const pageNum = Number(proposals?.length / 20).toFixed(0)
    push(
      `/community/${network}/${community}/${data.proposalId}?pageNum=${parseInt(pageNum, 10) - 1}`
    )
  }

  const proposerAddress = data.proposerAddress.toLowerCase()
  const ensName =
    avatars?.ensNames?.[`${proposerAddress}`] ||
    avatars?.openSeaNames?.[`${proposerAddress}`]

  return (
    <section className="mb-4 rounded-md bg-white p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <MemberImage
            address={proposerAddress}
            ensImage={avatars?.openSeaProfileImages?.[`${proposerAddress}`]}
          />
          <Paragraph as="p5" className="text-gray-dark">
            {ensName || truncateAddress(proposerAddress)}
          </Paragraph>
          <p className="font-abc text-[12px] text-grey">{elapsedTime}</p>
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
        {isActiveVoting && <VoteCountdown proposal={data} />}
      </div>
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
