import { Button } from '@/components/shared'
import { CHAIN_ID } from '@/constants/defaultChains'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'

interface SwitchNetworkButtonProps {
  title?: string
  loading?: boolean
}

const SwitchNetworkButton = ({
  title = 'Switch Network',
  loading = false,
}: SwitchNetworkButtonProps): JSX.Element => {
  const { walletClient } = usePrivyWalletClient()

  const handleClick = async () => {
    if (!walletClient) return
    await walletClient.switchChain({ id: CHAIN_ID })
  }

  return (
    <div className="mt-4 flex h-20 w-full justify-end">
      <Button
        type="button"
        className="fixed bottom-4 left-4 right-4 sm:relative sm:top-8"
        onClick={handleClick}
      >
        {loading ? (
          <span>
            Loading<span className="animate-pulse delay-75">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-200">.</span>
          </span>
        ) : (
          title
        )}
      </Button>
    </div>
  )
}
export default SwitchNetworkButton
