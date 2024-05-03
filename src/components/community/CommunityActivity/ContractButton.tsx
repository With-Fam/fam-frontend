'use client'

// Framework
import { Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Third Parties
import { useAccount, useBalance, useSwitchChain } from 'wagmi'
import { twMerge } from 'tailwind-merge'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'

// Types
interface ContractButtonProps {
  handleClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

// Helpers
import { useBridgeModal } from '@/hooks/useBridgeModal'
import { useChainStore } from '@/utils/stores/useChainStore'
import { useCheckAuth } from '@/hooks/useCheckAuth'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export const ContractButton = ({
  children,
  handleClick,
  disabled,
  className,
}: ContractButtonProps): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { canUserBridge, openBridgeModal } = useBridgeModal(
    router,
    pathname,
    searchParams
  )
  const appChain = useChainStore((x) => x.chain)
  const {
    wagmiData: { address: userAddress },
  } = useCheckAuth()
  const { switchChain } = useSwitchChain()
  const { chain: userChain } = useAccount()
  const { data: userBalance } = useBalance({
    address: userAddress,
    chainId: appChain.id,
  })

  const handleSwitchNetwork = () => switchChain?.({ chainId: appChain.id })

  const handleClickWithValidation = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (canUserBridge && userBalance?.decimals === 0) {
      return openBridgeModal()
    }
    if (userChain?.id !== appChain.id) {
      return handleSwitchNetwork()
    }

    handleClick(e)
  }

  return (
    <Button
      onClick={handleClickWithValidation}
      className={twMerge('mx-auto h-8 w-max px-4 py-2', className)}
      disabled={disabled}
    >
      <Paragraph as="p5" className="text-white">
        {children}
      </Paragraph>
    </Button>
  )
}

const SuspendedContractButton = (_props: ContractButtonProps) => (
  <Suspense>
    <ContractButton {..._props} />
  </Suspense>
)

export default SuspendedContractButton
