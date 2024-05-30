import { Icon } from '@/components/Icon'
import { Paragraph } from '@zoralabs/zord'

const PoolAddress = () => {
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
          0xj45...8BC
        </Paragraph>
        <Icon id="copy" fill="#a7a7a7" />
      </div>
    </section>
  )
}

export default PoolAddress
