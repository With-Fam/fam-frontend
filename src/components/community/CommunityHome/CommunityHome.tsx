'use client'

import Proposal from '@/components/community/CommunityHome/Proposal'
import { Loading } from '@/components/shared'
import { useProposalProvider } from '@/contexts/ProposalProvider'

const CommunityHome = () => {
  const { proposals, proposalsLoading, getProposals, nextOffset } =
    useProposalProvider() as any

  return (
    <main className="relative mx-auto max-w-[936px] px-2 pb-4">
      {proposals.map((proposal: any, index: any) => (
        <Proposal
          key={proposal.proposalId}
          data={proposal}
          proposalIndex={index}
        />
      ))}
      {proposalsLoading && <Loading />}
      {nextOffset !== -1 && !proposalsLoading && (
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
