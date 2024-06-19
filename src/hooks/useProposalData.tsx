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

  return {
    proposal,
    setProposal,
  }
}

export default useProposalData
