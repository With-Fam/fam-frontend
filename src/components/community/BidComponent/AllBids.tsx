'use client'

// Framework
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Third Parties
import { motion } from 'framer-motion'
import { twJoin } from 'tailwind-merge'

// Components
import { Paragraph } from '@/stories'
const RenderBidders = dynamic(() => import('@/components/community/BidComponent/RenderBidders'), {
  ssr: false,
})
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

// Types
import { AuctionBid, ExploreDaoFragment } from '@/data/subgraph/sdk.generated'
type AllBidsProps = {
  page: ExploreDaoFragment
  bids: AuctionBid[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const AllBids = ({ page, bids }: AllBidsProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  const variants = {
    open: { maxHeight: '167px' },
    closed: { maxHeight: '0px' },
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <UserAvatar
            width={24}
            height={24}
            address={page?.highestBid?.bidder}
          />
          <UserName address={page?.highestBid?.bidder} />
        </div>
        {bids && bids.length > 0 && (
          <button className="cursor-pointer" onClick={() => setOpen(!open)}>
            <Paragraph as="p5" className="flex gap-1">
              All bids
              <span
                className={twJoin(
                  'block transition-transform duration-300 ',
                  open ? 'rotate-90' : 'rotate-0'
                )}
              >
                &gt;
              </span>
            </Paragraph>
          </button>
        )}
      </div>
      <motion.div
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={variants}
        className="flex h-full flex-col gap-4 overflow-y-scroll transition-all"
      >
        {bids?.map((bid, index) => (
          <RenderBidders address={bid.bidder} amount={bid.amount} key={index} />
        ))}
      </motion.div>
    </>
  )
}

export default AllBids
