'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Paragraph } from '@/stories'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import useCommunity from '@/hooks/useCommunity'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'

interface CommunityCardProps {
  community: Address
}

const CommunityCard = ({ community }: CommunityCardProps): JSX.Element => {
  const { network } = useParams()
  const { data, name } = useCommunity(community)

  return (
    <Link href={`/community/${network}/${community}`}>
      <div className="flex flex-col bg-white rounded-lg overflow-hidden">
        {data && (
          <>
            <div className="aspect-square w-full">
              <Image
                src={getPartyDaoIpfsLink(data?.image)}
                alt={name || data?.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Paragraph as="p3" className="font-bold text-black">
                {name || data?.name}
              </Paragraph>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default CommunityCard