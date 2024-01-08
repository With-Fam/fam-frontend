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
import { AuctionBid, TokenFragment } from '@/data/subgraph/sdk.generated'
import AllBids from '@/components/community/BidComponent/AllBids'
type BidComponentProps = {
  token: TokenFragment
  page: any
  metaData: any
  bids: AuctionBid[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = ({
  token,
  page,
  metaData,
  bids,
}: BidComponentProps): JSX.Element => {
  const endTime = page?.endTime
  const isOver = !!endTime
    ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime)
    : true

  return (
    <section className="px-4">
      <div className="m-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative col-span-1 row-span-1 aspect-square w-full rounded-lg">
          {token?.image && (
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
          <div className="flex w-full flex-col">
            <BidStatus page={page} />
            <AllBids page={page} bids={bids} />
          </div>
          {isOver ? (
            <StartNextAuction page={page} />
          ) : (
            <PlaceBid token={token} />
          )}
        </div>
        <>
          <div className="col-span-1">
            <BidDescription page={page} token={token} metaData={metaData} />
            <SocialMediaItems metadataAddress={metaData?.metadataAddress} />
          </div>
          {/* <RaisedComponent /> */}
        </>
      </div>
    </section>
  )
}

export default BidComponent
