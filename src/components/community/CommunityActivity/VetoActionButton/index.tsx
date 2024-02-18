'use client'

// Framework
import { useEffect, useState } from 'react'

// Third Parties
import { type Address, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useSWRConfig } from 'swr'
import { waitForTransaction } from 'wagmi/actions'

// Components
import { Button } from '@/components/shared/Button'
import { twMerge } from 'tailwind-merge'
import Paragraph from '@/stories/Paragraph'
import VetoConfirmModal from '@/components/community/CommunityActivity/VetoActionButton/VetoConfirmModal'
import { Loading } from '@/components/shared'

// Types
type VetoActionButtonProps = {
  functionName: 'veto'
  args: [Address]
  buttonText: string
  onSuccess: () => void
  proposalId: string
  buttonClassName?: string
}

// Helpers
import { useChainStore } from '@/utils/stores/useChainStore'
import { useDaoStore } from '@/modules/dao'
import { governorAbi } from '@/data/contract/abis'
import SWR_KEYS from '@/constants/swrKeys'
import { getProposal } from '@/data/subgraph/requests/proposalQuery'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VetoActionButton = ({
  proposalId,
  buttonText,
  onSuccess,
  buttonClassName,
}: VetoActionButtonProps): JSX.Element => {
  const { addresses } = useDaoStore()
  const { mutate } = useSWRConfig()
  const chain = useChainStore((x) => x.chain)
  const [isPending, setIsPending] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { config } = usePrepareContractWrite({
    enabled: !!addresses?.governor,
    address: addresses?.governor,
    abi: governorAbi,
    functionName: 'veto',
    args: [proposalId as Address],
  })

  const { writeAsync } = useContractWrite(config)
  const hardReload = () => {
    const baseUrl = window.location.href.split('?')[0]
    window.location.href = baseUrl
  }

  const executeVeto = async () => {
    if (!writeAsync) return

    try {
      setIsPending(true)
      const { hash } = await writeAsync?.()
      await waitForTransaction({ hash })

      await mutate(
        [SWR_KEYS.PROPOSAL, chain.id, proposalId],
        getProposal(chain.id, proposalId)
      )
      setIsPending(false)
      onSuccess()
      setTimeout(() => {
        hardReload()
      }, 1000)
    } catch (err) {
      setIsPending(false)
      console.log('err', err)
    }
  }

  useEffect(() => {
    isConfirmed && executeVeto()
  }, [isConfirmed])

  if (isPending) {
    return <Loading />
  }

  if (openConfirm && !isConfirmed) {
    return (
      <VetoConfirmModal
        setOpenConfirm={setOpenConfirm}
        setIsConfirmed={setIsConfirmed}
        buttonClassName={buttonClassName}
      />
    )
  }

  return (
    <Button
      type="button"
      className={twMerge('mx-auto h-8 w-max px-4 py-2', buttonClassName)}
      onClick={() => setOpenConfirm(true)}
    >
      <Paragraph as="p5" className="text-white">
        {buttonText}
      </Paragraph>
    </Button>
  )
}

export default VetoActionButton
