import useEthBalance from '@/hooks/useEthBalance'
import useEthPrice from '@/hooks/useEthPrice'
import { Paragraph } from '@zoralabs/zord'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

const Pool = () => {
  const { community } = useParams()
  const { ethBalance } = useEthBalance(community as Address)
  const { getUsdConversion } = useEthPrice()

  return (
    <section className="mt-2 rounded-md bg-background p-4">
      <Paragraph as="p4" className="text-orange">
        Community pool
      </Paragraph>
      <div className="mt-3 flex justify-between">
        <Paragraph as="p1" className="font-abcMedium text-2xl">
          {ethBalance} ETH
        </Paragraph>
        <Paragraph as="p4" className="font-abc text-grey">
          ${getUsdConversion(ethBalance)}
        </Paragraph>
      </div>
    </section>
  )
}

export default Pool
