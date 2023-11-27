// Framework
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Local Components
import PlaceBid from '@/components/community/BidComponent/PlaceBid'
import BidDescription from '@/components/community/BidComponent/BidDescription'
const BidStatus = dynamic(
  () => import('@/components/community/BidComponent/BidStatus'),
  {
    ssr: false,
  }
)
const SocialMediaItems = dynamic(
  () => import('@/components/community/BidComponent/SocialMediaItems'),
  {
    ssr: false,
  }
)

// Types
import {
  AuctionFragment,
  DaoFragment,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'
type BidComponentProps = {
  token: TokenFragment
  page: AuctionFragment
  metaData: DaoFragment
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = ({
  token,
  page,
  metaData,
}: BidComponentProps): JSX.Element => (
  <section className="px-4">
    <div className="gid-cols-1 m-auto grid w-full max-w-4xl gap-8 md:grid-cols-2">
      <div className="relative col-span-1 aspect-square w-full rounded-lg">
        {token.image && (
          <Image
            src={token.image}
            alt=""
            fill
            sizes="100vw; md:50vw"
            className="relative -z-10 rounded-lg object-contain"
          />
        )}
      </div>
      <BidStatus page={page} />
      <PlaceBid />
      <div>
        <BidDescription page={page} token={token} metaData={metaData} />
        <SocialMediaItems metadataAddress={metaData.metadataAddress} />
      </div>
    </div>
  </section>
)

export default BidComponent
