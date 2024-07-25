import useProposals from '@/hooks/useProposals'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export enum PROPOSAL_STATUS {
  Invalid,
  Voting,
  Defeated,
  Passed,
  Ready,
  InProgress,
  Complete,
  Cancelled,
}

const useProposalData = () => {
  const [proposal, setProposal] = useState()
  const { community } = useParams()
  const { proposals, loading, getProposals, nextOffset } =
    useProposals(community)
  const [selectedProposalIndex, setSelectedProposalIndex] = useState(0)

  return {
    proposal,
    setProposal,
    proposalsLoading: loading,
    getProposals,
    setSelectedProposalIndex,
    proposals,
    nextOffset,
  }
}

export default useProposalData
