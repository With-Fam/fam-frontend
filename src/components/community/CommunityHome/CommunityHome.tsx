'use client'

import { useParams } from 'next/navigation'
import useProposals from '@/hooks/useProposals'
import Proposal from '@/components/community/CommunityHome/Proposal'
import { Loading } from '@/components/shared'

const CommunityHome = () => {
  const { community } = useParams()
  const { proposals, loading, nextOffset, getProposals } =
    useProposals(community)

  return (
    <main className="relative mx-auto max-w-[936px] px-2 pb-4">
      {proposals.map((proposal: any) => (
        <Proposal key={proposal.proposalId} data={proposal} />
      ))}
      {loading && <Loading />}
      {nextOffset !== -1 && !loading && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => getProposals(nextOffset)}
            className="rounded-full bg-blue-light px-3 py-1 font-abcMedium text-white"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  )
}

export default CommunityHome
