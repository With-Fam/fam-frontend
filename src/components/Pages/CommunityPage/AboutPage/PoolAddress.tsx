import { Icon } from '@/components/Icon'
import copyToClipboard from '@/lib/copyToClipboard'
import truncateAddress from '@/lib/truncateAddress'
import { Paragraph } from '@zoralabs/zord'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Address } from 'viem'

const PoolAddress = () => {
  const { community } = useParams()

  const onCopy = () => {
    copyToClipboard(community as string)
    toast.success('Address copied!')
  }

  return (
    <section className="mt-4 rounded-md bg-background p-4">
      <div className="mb-2 flex justify-between">
        <Paragraph as="p4" className="text-orange">
          Community pool address
        </Paragraph>
        <Icon id="external-link" fill="#ffffff" />
      </div>
      <div className="flex items-center gap-1">
        <Paragraph as="p1" className="font-abcMedium text-2xl">
          {truncateAddress(community as Address)}
        </Paragraph>
        <button type="button" onClick={onCopy}>
          <Icon id="copy" fill="#a7a7a7" />
        </button>
      </div>
    </section>
  )
}

export default PoolAddress
