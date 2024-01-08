// Local Components
import Paragraph from '@/stories/Paragraph'
import { Button } from '@/components/shared'

// Types
type WalletComponentProps = {
  userBalance: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const WalletComponent = ({
  userBalance,
}: WalletComponentProps): JSX.Element => (
  <div className="mt-6 flex w-full items-center justify-between rounded-xl bg-background p-3">
    <div className="flex-1">
      <Paragraph as="p4" className="mb-2 text-grey">
        Wallet balance
      </Paragraph>
      <Paragraph as="p3" className="text-black">
        {userBalance}
      </Paragraph>
    </div>
    {false /* as requested, implemented, but hidden for now */ && (
      <Button type="button" className="h-min px-3 py-2">
        <Paragraph as="p5">Add Funds</Paragraph>
      </Button>
    )}
  </div>
)

export default WalletComponent
