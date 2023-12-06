'use client'
// Framework
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import dayjs from 'dayjs'

// Local Components
import StartNextAuction from './StartNextAuction'
import { Button } from '@/components/shared'
import PlaceBid from '@/components/community/BidComponent/PlaceBid'
import BidDescription from '@/components/community/BidComponent/BidDescription'
import { useDaoStore } from '@/modules/dao'
// import { useChainStore } from '@/stores/useChainStore'
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
  // CurrentAuctionFragment,
  // DaoFragment,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'
type BidComponentProps = {
  token: TokenFragment
  page: any
  metaData: any
  // DaoFragment
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
  const chain = 5
  const addresses = useDaoStore((state) => state.addresses)
  // const isWinner = owner != undefined && address == owner
  const { address } = useAccount()

  const { endTime } = page

  const isOver = !!endTime
    ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime)
    : true
  // const formattedBid = bid ? formatEther(bid) : ''

  return (
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
        {isOver || isOver ? (
          <StartNextAuction page={page} />
        ) : (
          <>
            <BidStatus page={page} />
            <PlaceBid token={token} />
          </>
        )}
        <div>
          <BidDescription page={page} token={token} metaData={metaData} />
          <SocialMediaItems metadataAddress={metaData?.metadataAddress} />
        </div>
      </div>
    </section>
  )
}

export default BidComponent
