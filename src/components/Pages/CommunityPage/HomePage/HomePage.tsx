'use client'

import Proposal from './Proposal'
import { PointyTopIcon } from '@/components/icons'
import { Loading } from '@/components/shared'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import { useProposalProvider } from '@/contexts/ProposalProvider'

const HomePage = () => {
  const { proposals, proposalsLoading, getProposals, nextOffset } =
    useProposalProvider() as any
  const { partyInfo } = useCommunityProvider() as any
  const isEmpty = proposals.length === 0

  if (proposalsLoading && isEmpty) return <Loading />

  return (
    <main className="relative mx-auto max-w-[936px] px-4 pb-4">
      {isEmpty ? (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-grey-light">
            <PointyTopIcon color="#F54D18" className="h-8 w-8" />
          </div>
          <p className="text-center font-abcMedium text-[20px]">
            {partyInfo?.name} {`hasn't posted any activites yet.`}
          </p>
        </div>
      ) : (
        proposals.map((proposal: any, index: any) => (
          <Proposal
            key={proposal.proposalId}
            data={proposal}
            proposalIndex={index}
          />
        ))
      )}
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

export default HomePage
