import { Copy } from '@/components/icons'
import useIsMobile from '@/hooks/useIsMobile'
import truncateAddress from '@/lib/truncateAddress'
import { Paragraph } from '@/stories'
import toast from 'react-hot-toast'
import { Address } from 'viem'

const AddressCopy = ({ address }: { address: Address }) => {
  const { isMobile } = useIsMobile()

  return (
    <div className="w-full rounded-2xl bg-white p-4">
      <div className="flex w-full justify-between truncate">
        <Paragraph as="p3" className="max-w-[270px]">
          {isMobile ? truncateAddress(address) : address}
        </Paragraph>
        <button
          type="button"
          className=""
          onClick={() => {
            navigator.clipboard.writeText(address)
            toast.success('Address copied to clipboard!')
          }}
        >
          <Copy />
        </button>
      </div>
    </div>
  )
}

export default AddressCopy
