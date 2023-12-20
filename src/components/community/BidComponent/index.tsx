'use client'

// Framework
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Third Parties
import dayjs from 'dayjs'

// Local Components
import StartNextAuction from './StartNextAuction'
import PlaceBid from '@/components/community/BidComponent/PlaceBid'
import BidDescription from '@/components/community/BidComponent/BidDescription'
import BidStatus from '@/components/community/BidComponent/BidStatus'
const SocialMediaItems = dynamic(
  () => import('@/components/community/BidComponent/SocialMediaItems'),
  {
    ssr: false,
  }
)

// Types
import TotalAmountBox from '@/components/community/BidComponent/TotalAmountBox'
import { TokenFragment } from '@/data/subgraph/sdk.generated'
type BidComponentProps = {
  token: TokenFragment
  page: any
  metaData: any
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = ({
  token,
  page,
  metaData,
}: BidComponentProps): JSX.Element => {
  const endTime = page?.endTime
  const isOver = !!endTime
    ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime)
    : true

  return (
    <section className="px-4">
      <div className="m-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative col-span-1 row-span-1 aspect-square w-full rounded-lg">
          {token.image && (
            <Image
              src={token?.image}
              alt=""
              fill
              sizes="100vw; md:50vw"
              className="relative -z-10 rounded-lg object-contain"
            />
          )}
        </div>
        <div className="col-span-1 row-span-1">
          <BidStatus page={page} />
          {isOver ? (
            <StartNextAuction page={page} />
          ) : (
            <PlaceBid token={token} />
          )}
        </div>
        <div className="col-span-1">
          <BidDescription page={page} token={token} metaData={metaData} />
          <SocialMediaItems metadataAddress={metaData?.metadataAddress} />
        </div>
        <div className="col-span-1">
          <TotalAmountBox
            title="Total Raised"
            valueEth="477.54"
            valueCurrency="883,449"
          />
          <TotalAmountBox
            title="Community pool"
            valueEth="477.54"
            valueCurrency="883,449"
          />
        </div>
      </div>
    </section>
  )
}

export default BidComponent
