import Socials from '@/components/Pages/CommunityPage/AboutPage/Socials'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import { Paragraph } from '@/stories'
import Image from 'next/image'

const Description = () => {
  const { partyInfo } = useCommunityProvider() as any
  return (
    <div className="p-3">
      <div className="flex items-center gap-2">
        {partyInfo?.image && (
          <div className="relative flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full">
            <Image
              src={ipfsGatewayUrl(partyInfo?.image) as any}
              alt=""
              width={80}
              height={80}
            />
          </div>
        )}
        <p className="text-md font-abcWide md:text-2xl">
          {partyInfo?.name || ''}
        </p>
      </div>
      <Paragraph as="p3" className="mt-3 break-all font-abc">
        {partyInfo?.description}
      </Paragraph>
      <Socials />
    </div>
  )
}

export default Description
