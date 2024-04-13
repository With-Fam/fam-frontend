'use client'

// Third Parties
import dayjs from 'dayjs'

// Local Components
import StartNextAuction from './StartNextAuction'
import PlaceBid from '@/components/community/BidComponent/PlaceBid'
import BidDescription from '@/components/community/BidComponent/BidDescription'
import BidStatus from '@/components/community/BidComponent/BidStatus'
import AllBids from '@/components/community/BidComponent/AllBids'
import { HandleImage } from '@/components/shared/HandleImage'

// Types
import {
  Auction,
  AuctionBid,
  // AuctionBid,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'
import useSWR from 'swr'
import SWR_KEYS from '@/constants/swrKeys'
import { getBids } from '@/data/subgraph/requests/getBids'
import { unpackOptionalArray } from '@/utils/helpers'
import { AddressType } from '@/types'
import { auctionAbi } from '@/data/contract/abis'
import { readContract } from 'wagmi/actions'
import { useContractRead } from 'wagmi'
type BidComponentProps = {
  token: TokenFragment
  page: Auction
  metaData: any
  // bids: AuctionBid[]
  chainId: number
  communityId: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = ({
  token,
  page,
  metaData,
  // bids,
  chainId,
  communityId,
}: BidComponentProps): JSX.Element => {
  const { data: auction } = useSWR(
    [SWR_KEYS.AUCTION, chainId, metaData.auctionAddress],
    ([_, chId, auctionAddress]: [string, number, string]) =>
      readContract({
        abi: auctionAbi,
        address: auctionAddress as AddressType,
        functionName: 'auction',
        chainId: chId,
      }),
    { revalidateOnFocus: true }
  )
  const [currentTokenId, highestBid, highestBidder, _, endTime, settled] =
    unpackOptionalArray(auction, 6)

  const isOver = !!endTime
    ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime)
    : true

  const { data: bids } = useSWR(
    [SWR_KEYS.AUCTION_BIDS, chainId, communityId, token.tokenId],
    () => getBids(chainId, communityId, token.tokenId)
  )

  return (
    <section className="px-4">
      <div className="m-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative col-span-1 row-span-1 aspect-square w-full rounded-lg">
          {token?.image && (
            <HandleImage
              src={token?.image}
              alt=""
              fill
              sizes="100vw; md:50vw"
              className="relative -z-10 rounded-lg object-cover"
              noDefault
            />
          )}
        </div>
        <div className="col-span-1 row-span-1">
          <div className="flex w-full flex-col">
            <BidStatus
              dao={page.dao}
              endTime={endTime}
              highestBid={highestBid}
              token={page.token}
            />
            <AllBids page={page} bids={bids as AuctionBid[]} />
          </div>
          {isOver ? (
            <StartNextAuction chainId={chainId} owner={highestBidder} />
          ) : (
            <PlaceBid
              token={token}
              chainId={chainId}
              highestBid={page.highestBid?.amount}
              communityId={communityId}
              auctionAddress={metaData.auctionAddress}
            />
          )}
        </div>
        <>
          <div className="col-span-1">
            <BidDescription page={page} token={token} metaData={metaData} />
          </div>
        </>
      </div>
    </section>
  )
}

export default BidComponent
