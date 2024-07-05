import ChainIcon from '@/components/ChainIcon'
import { CHAIN_ID } from '@/constants/defaultChains'
import Paragraph from '@/stories/Paragraph'

type WalletComponentProps = {
  userBalance: string
}

const WalletComponent = ({
  userBalance,
}: WalletComponentProps): JSX.Element => (
  <div className="flex items-center justify-between rounded-xl bg-background p-3">
    <ChainIcon chainId={CHAIN_ID} />
    <Paragraph as="p3" className="text-black">
      {Number(userBalance).toFixed(2)} ETH
    </Paragraph>
  </div>
)

export default WalletComponent
