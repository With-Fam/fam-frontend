'use client'

// Framework
import { useState, useEffect } from 'react'

// Third Parties
import { useSWRConfig } from 'swr'
import { Address, useContractReads } from 'wagmi'
import toast from 'react-hot-toast'

// Local Components
import { Paragraph } from '@/stories'
import ActivityCountdown from '@/components/community/CommunityActivity/ActivityCountdown'
import QueueButton from '@/components/community/CommunityActivity/QueueButton'
import ExecuteButton from '@/components/community/CommunityActivity/ExecuteButton'
import VetoActionButton from '@/components/community/CommunityActivity/VetoActionButton'

// Types
import {
  getProposal,
  type Proposal,
} from '@/data/subgraph/requests/proposalQuery'
import type { ProposalFragment } from '@/data/subgraph/sdk.generated'
import { BytesType } from '@/types'
type ActivityStateActionsProps = {
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
import { governorAbi } from '@/data/contract/abis'
import { isProposalOpen } from '@/components/community/CommunityActivity/helpers'
import { useCheckAuth } from '@/hooks/useCheckAuth'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityStateActions = ({
  proposal,
  chainId,
}: ActivityStateActionsProps): JSX.Element => {
  const [state, setState] = useState<number | null>(null)
  const [baseProposal, setBaseProposal] = useState<Proposal | null>(null)
  const { mutate } = useSWRConfig()
  const proposalId = proposal.proposalId
  const governorAddress = proposal.dao.governorAddress
  const {
    wagmiData: { address: userAddress },
  } = useCheckAuth()
  const { data } = useContractReads({
    enabled: !!userAddress,
    allowFailure: false,
    keepPreviousData: true,
    contracts: [
      {
        abi: governorAbi,
        address: governorAddress,
        chainId: chainId,
        functionName: 'getVotes',
        args: [userAddress as `0x${string}`, BigInt(proposal.timeCreated)],
      } as any,
      {
        abi: governorAbi,
        address: governorAddress,
        chainId: chainId,
        functionName: 'vetoer',
      } as any,
    ] as const,
  })
  const shouldShowActions =
    state === ProposalState.Active ||
    state === ProposalState.Pending ||
    userAddress

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

  if (!shouldShowActions || !data) {
    return <></>
  }
  const [votes, vetoer] = data
  const isVetoer = userAddress ? userAddress === vetoer : false
  const proposalOpen = isProposalOpen(state as ProposalState)
  const showVeto = proposalOpen && isVetoer

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
      {showVeto && (
        <div className="grid gap-4 rounded-lg border border-solid border-grey-light px-4 py-5 text-center">
          <Paragraph as="p5" className="text-grey">
            You can veto this activity
          </Paragraph>
          <VetoActionButton
            functionName="veto"
            args={[proposalId as Address]}
            buttonText="Veto"
            onSuccess={() => {
              toast.success(`You've successfully vetoed this proposal`)
            }}
            proposalId={proposalId}
            buttonClassName="bg-status-red"
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

export default ActivityStateActions
