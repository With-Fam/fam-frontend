import { useCommunityProvider } from '@/contexts/CommunityProvider'
import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import { Paragraph } from '@/stories'
import Image from 'next/image'

const Description = () => {
  const { partyInfo } = useCommunityProvider() as any

  return (
    <>
      <div className="flex items-center gap-2">
        {partyInfo?.image && (
          <Image
            src={ipfsGatewayUrl(partyInfo?.image) as any}
            alt=""
            width={64}
            height={64}
          />
        )}
        <p className="text-md font-abcWide md:text-2xl">
          {partyInfo?.name || ''}
        </p>
      </div>
      <Paragraph as="p3" className="break-all p-3 font-abcMedium">
        {partyInfo?.description}
      </Paragraph>
    </>
  )
}

export default Description
