'use client'

// Framework
import Image from 'next/image'
import { useState } from 'react'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'
import { formatEther } from 'ethers'
import { motion } from 'framer-motion'
import { twJoin } from 'tailwind-merge'

// Components
import { Paragraph } from '@/stories'

// Types
import { AuctionBid, ExploreDaoFragment } from '@/data/subgraph/sdk.generated'
type AllBidsProps = {
  page: ExploreDaoFragment
  bids: AuctionBid[]
}

// Helpers
import { walletSnippet } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const AllBids = ({ page, bids }: AllBidsProps): JSX.Element => {
  const { displayName, ensAvatar } = useEnsData(page?.highestBid?.bidder)
  const [open, setOpen] = useState(false)

  const variants = {
    open: { maxHeight: '167px' },
    closed: { maxHeight: '0px' },
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          {ensAvatar && (
            <Image
              src={ensAvatar}
              width={24}
              height={24}
              alt=""
              className="rounded-full object-cover"
            />
          )}
          <Paragraph as="p5" className="pl-2.5">
            {displayName}
          </Paragraph>
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
          <div key={index} className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={`/assets/images/users/u${(index % 9) + 1}.jpeg`}
                width={24}
                height={24}
                alt=""
                className="h-6 w-6 rounded-full object-cover"
              />
              <Paragraph as="p5" className="h-min text-grey-dark">
                {walletSnippet(bid.bidder)}
              </Paragraph>
            </div>
            <Paragraph as="p5" className="text-grey-dark">
              {formatEther(bid.amount)} ETH
            </Paragraph>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AllBids
