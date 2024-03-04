'use client'

// Framework
import { useState, useEffect, type ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

// Third Parties
import { useContractReads } from 'wagmi'
import { twJoin, twMerge } from 'tailwind-merge'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'

// Helpers
import { governorAbi } from '@/data/contract/abis'
import { ProposalState } from '@/data/contract/requests/getProposalState'
import { ProposalVote } from '@/data/subgraph/sdk.generated'

// Types
import { AddressType } from '@/types'
type ShowVoteManagerProps = {
  chainId: number
  governorAddress: AddressType
  userAddress: AddressType
  timeCreated: string
  state: number | null
  signerVote?: ProposalVote
  proposalId: string
  className: string
  href: LinkProps['href']
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ShowVoteManager = ({
  chainId,
  governorAddress,
  userAddress,
  timeCreated,
  state,
  signerVote,
  proposalId,
  className,
  href,
}: ShowVoteManagerProps): JSX.Element => {
  const [vote, setVote] = useState<ProposalVote | undefined>(signerVote)
  const { data } = useContractReads({
    enabled: true,
    allowFailure: false,
    keepPreviousData: true,
    contracts: [
      {
        abi: governorAbi,
        address: governorAddress as AddressType,
        chainId: chainId,
        functionName: 'getVotes',
        args: [userAddress as AddressType, BigInt(timeCreated)],
      },
      {
        abi: governorAbi,
        address: governorAddress as AddressType,
        chainId: chainId,
        functionName: 'vetoer',
      },
    ] as const,
  })

  useEffect(() => {
    if (!userAddress) {
      return
    }

    const storedVote = sessionStorage.getItem(
      `vote-${proposalId}-${userAddress}`
    )

    if (storedVote) {
      if (!signerVote) {
        setVote(JSON.parse(storedVote))
      } else {
        sessionStorage.removeItem(`vote-${proposalId}-${userAddress}`)
      }
    }
  }, [userAddress, signerVote, proposalId])

  if (!data) return <div>Loading...</div>

  const [votes, vetoer] = data
  const votesAvailable = !!votes ? Number(votes) : 0

  {
    /* Voting for proposal has not yet started (proposal is Pending) */
  }
  if (state === ProposalState.Pending) {
    return (
      <Button
        disabled
        type="button"
        className={twMerge(
          className,
          'w-max cursor-not-allowed whitespace-nowrap',
          ' bg-grey-light text-black opacity-100'
        )}
      >
        <Paragraph as="p5">Voting not started</Paragraph>
      </Button>
    )
  }
  {
    /* Proposal is open and user can vote */
  }
  if (state === ProposalState.Active && votesAvailable && !vote) {
    return (
      <Link href={href} passHref>
        <Button type="button" className={className}>
          <Paragraph as="p5">Vote</Paragraph>
        </Button>
      </Link>
    )
  }
  {
    /* Proposal is open but user cannot vote */
  }
  if (state === ProposalState.Active && !votesAvailable && !vote) {
    return (
      <Button
        disabled
        type="button"
        className={twMerge(
          className,
          'w-max cursor-not-allowed whitespace-nowrap',
          ' bg-grey-light text-black opacity-100'
        )}
      >
        <Paragraph as="p5">No tokens</Paragraph>
      </Button>
    )
  }

  {
    /* User has voted */
  }
  if (vote) {
    return (
      <div>
        Your vote:{' '}
        <span
          className={twJoin(
            'lowercase',
            vote.support === 'ABSTAIN' && 'text-status-purple',
            vote.support === 'FOR' && 'text-status-green',
            vote.support === 'AGAINST' && 'text-status-red'
          )}
        >
          {vote.support === 'FOR'
            ? 'yes'
            : vote.support === 'AGAINST'
              ? 'no'
              : vote.support}
        </span>
      </div>
    )
  }

  return <></>
}

export default ShowVoteManager
