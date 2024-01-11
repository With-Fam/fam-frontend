'use client'

// Framework
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'

// Types
interface ContractButtonProps {
  handleClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
  disabled?: boolean
}

// Helpers
import { useBridgeModal } from '@/hooks/useBridgeModal'
import { useChainStore } from '@/utils/stores/useChainStore'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export const ContractButton = ({
  children,
  handleClick,
  disabled,
}: ContractButtonProps): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { canUserBridge, openBridgeModal } = useBridgeModal(
    router,
    pathname,
    searchParams,
  )
  const appChain = useChainStore((x) => x.chain)
  const { openConnectModal } = useConnectModal()
  const { address: userAddress } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { chain: userChain } = useNetwork()
  const { data: userBalance } = useBalance({
    address: userAddress,
    chainId: appChain.id,
  })

  const handleSwitchNetwork = () => switchNetwork?.(appChain.id)

  const handleClickWithValidation = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userAddress) {
      return openConnectModal?.()
    }
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
      className="mx-auto h-8 w-max px-4 py-2"
      disabled={disabled}
    >
      <Paragraph as="p5" className="text-white">
        {children}
      </Paragraph>
    </Button>
  )
}

export default ContractButton
