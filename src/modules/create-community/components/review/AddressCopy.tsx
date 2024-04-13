import { Copy } from '@/components/icons'
import { Paragraph } from '@/stories'
import { AddressType } from '@/types'
import toast from 'react-hot-toast'

const AddressCopy = ({ address }: { address: AddressType }) => (
  <div className="w-full rounded-2xl bg-white p-4">
    <div className="flex w-full justify-between truncate">
      <Paragraph as="p3" className="max-w-[270px]">
        {address}
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

export default AddressCopy
