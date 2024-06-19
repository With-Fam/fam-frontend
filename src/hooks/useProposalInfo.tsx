import getProposalInfo from '@/utils/party/getProposalInfo'
import { useEffect, useState } from 'react'

const useProposalInfo = (proposal: any) => {
  const [proposalInfo, setProposalInfo] = useState(null) as any

  useEffect(() => {
    const init = async () => {
      const data = await getProposalInfo(proposal)
      setProposalInfo(data)
    }
    if (!proposal) return
    init()
  }, [proposal])

  return {
    proposalInfo,
  }
}

export default useProposalInfo
