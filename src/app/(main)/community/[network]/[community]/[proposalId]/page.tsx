'use client'

import { Icon } from '@/components/Icon'
import ProposalInfo from '@/components/community/CommuntiyProposal/ProposalInfo'
import ProposalStatus from '@/components/community/ProposalStatus'
import { UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import { useProposalProvider } from '@/contexts/ProposalProvider'
import getProposalStatus from '@/utils/getProposalStatus'
import { useParams, useRouter } from 'next/navigation'

export default function CommunityProposal(): JSX.Element {
  const { proposal } = useProposalProvider() as any

  const status = getProposalStatus(proposal)
  const { push } = useRouter()
  const { community, network } = useParams()

  if (!proposal) {
    push(`/community/${network}/${community}`)
    return <></>
  }

  return (
    <main className="relative mx-auto mt-8 max-w-[936px] px-2 pb-4">
      <div className="flex justify-between font-abc text-grey">
        <div className="flex items-center gap-2">
          <UserAvatar
            address={proposal.proposerAddress}
            width={28}
            height={28}
          />
          by <EnsAddress address={proposal.proposerAddress} />
        </div>
        {new Date(proposal.createdTimestamp * 1000).toDateString()}
      </div>
      <p className="mb-2 mt-4 font-abcMedium text-[24px]">{proposal.name}</p>
      <ProposalStatus status={status} />
      <div className="mt-8 flex justify-between">
        <p className="text-[24px] text-green">
          {proposal.votes.length} <span className="text-[20px]">votes</span>
        </p>
        <div className="flex items-center justify-center rounded-full bg-grey px-4 py-1 text-grey-light">
          24h 33m 22s
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-grey">You can veto this activity</p>
        <button className="rounded-full bg-red px-4 py-2 text-white">
          Veto
        </button>
      </div>
      <p className="font-abcMedium text-[18px] leading-[160%]">
        PC Music has a storied history of disrupting the music scene,
        continuously pushing the boundaries of what's possible in the worlds of
        electronic and pop music. With the 44th release, we plan to take another
        quantum leap, further solidifying our reputation as pioneers in musical
        innovation.
        <br />
        <br />
        We’ve put together a detailed budget for the release here and are
        requesting $10,000 to cover marketing expenses and a launch party in Los
        Angeles on the 22nd August
      </p>
      <div className="mt-8 flex items-center text-orange">
        <p className="text-[16px]">Action</p>{' '}
        <Icon id="arrowTopRight" fill="#f54d18" />
      </div>
      <ProposalInfo proposal={proposal} />
    </main>
  )
}
