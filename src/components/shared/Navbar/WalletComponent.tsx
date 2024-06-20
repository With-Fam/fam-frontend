import Paragraph from '@/stories/Paragraph'

type WalletComponentProps = {
  userBalance: string
}

const WalletComponent = ({
  userBalance,
}: WalletComponentProps): JSX.Element => (
  <div className="mt-6 flex w-full items-center justify-between rounded-xl bg-background p-3">
    <div className="flex-1">
      <Paragraph as="p4" className="mb-2 text-grey">
        Wallet balance
      </Paragraph>
      <Paragraph as="p3" className="text-black">
        {Number(userBalance).toFixed(4)} ETH
      </Paragraph>
    </div>
  </div>
)

export default WalletComponent
