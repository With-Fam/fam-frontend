'use client'

// Framework
import { useState, useEffect } from 'react'

// Third Parties
import { useSWRConfig } from 'swr'
import { Address } from 'wagmi'
import toast from 'react-hot-toast'

// Local Components
import { Paragraph } from '@/stories'
import ActivityCountdown from '@/components/community/CommunityActivity/ActivityCountdown'

// Types
import {
  getProposal,
  type Proposal,
} from '@/data/subgraph/requests/proposalQuery'
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
import QueueButton from '@/components/community/CommunityActivity/QueueButton'
type ActivityQueueProps = {
  proposal: ProposalFragment
  chainId: number
}

// Helpers
import {
  ProposalState,
  getProposalState,
} from '@/data/contract/requests/getProposalState'
import { isProposalExecutable } from '@/utils/isProposalExecutable'
import SWR_KEYS from '@/constants/swrKeys'
import ExecuteButton from '@/components/community/CommunityActivity/ExecuteButton'
import { BytesType } from '@/types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityQueue = ({
  proposal,
  chainId,
}: ActivityQueueProps): JSX.Element => {
  const [state, setState] = useState<number | null>(null)
  const [baseProposal, setBaseProposal] = useState<Proposal | null>(null)
  const { mutate } = useSWRConfig()
  const proposalId = proposal.proposalId
  const governorAddress = proposal.dao.governorAddress

  useEffect(() => {
    if (governorAddress && proposalId) {
      getProposalState(chainId, governorAddress, proposalId).then((data) => {
        setState(data)
        setBaseProposal({
          ...proposal,
          calldatas: proposal.calldatas ? proposal.calldatas.split(':') : [],
          state: data,
        })
      })
    }
  }, [proposal, chainId, proposalId, governorAddress])

  const onEnd = () => {
    mutate(
      [SWR_KEYS.PROPOSAL, chainId, proposalId],
      getProposal(chainId, proposalId)
    )
  }

  return (
    <>
      {state === ProposalState.Succeeded && (
        <div className="grid gap-4 rounded-lg border border-solid border-grey-light px-4 py-5 text-center">
          <Paragraph as="p5" className="text-grey">
            Queue this activity before it expires
          </Paragraph>
          <QueueButton
            functionName="queue"
            args={[proposalId as Address]}
            buttonText="Queue Activity"
            onSuccess={() => {
              toast.success(`You've successfully queued this proposal`)
            }}
            proposalId={proposalId}
          />
        </div>
      )}
      {state === ProposalState.Queued &&
        baseProposal &&
        !isProposalExecutable(baseProposal) && (
          <div className="grid gap-4 rounded-lg border border-solid border-grey-light px-4 py-5 text-center">
            <Paragraph as="p5" className="text-grey">
              Time until this activity can be finalized
            </Paragraph>
            <ActivityCountdown end={proposal.executableFrom!} onEnd={onEnd} />
          </div>
        )}
      {baseProposal && isProposalExecutable(baseProposal) && (
        <div className="grid gap-4 rounded-lg border border-solid border-grey-light px-4 py-5 text-center">
          <Paragraph as="p5" className="text-grey">
            Finalize this activity onchain
          </Paragraph>
          <ExecuteButton
            proposalId={proposalId}
            onSuccess={() => {
              toast.success(`You've successfully executed this proposal`)
            }}
            targets={proposal.targets as Address[]}
            values={proposal.values.map((v) => BigInt(v))}
            calldatas={
              proposal.calldatas
                ? proposal.calldatas.split(':').map((c) => c as BytesType)
                : []
            }
            descriptionHash={proposal.descriptionHash as BytesType}
            proposer={proposal.proposer as Address}
          />
        </div>
      )}
    </>
  )
}

export default ActivityQueue
