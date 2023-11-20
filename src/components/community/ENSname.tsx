'use client'
import { useEnsName } from 'wagmi'
import { Paragraph } from '@/stories'

const ENSname = ({ owner }: { owner: `0xString` }): JSX.Element => {
  const { data } = useEnsName({
    address: owner,
    chainId: 1,
  })

  return (
    <Paragraph as="p3" className="flex items-center gap-1">
      {data ? data : owner}
    </Paragraph>
  )
}

export default ENSname
