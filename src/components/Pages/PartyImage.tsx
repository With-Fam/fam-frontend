import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import Image from 'next/image'

const PartyImage = ({ imageUrl }: any) => (
  <div className="relative flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full">
    <Image
      src={ipfsGatewayUrl(imageUrl) as any}
      alt=""
      width={80}
      height={80}
    />
  </div>
)

export default PartyImage
