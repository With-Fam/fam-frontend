'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { Address } from 'viem'

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

const VetoActionButton = ({
  proposalId,
  buttonText,
  onSuccess,
  buttonClassName,
}: VetoActionButtonProps): JSX.Element => {
  const [isPending, setIsPending] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

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
