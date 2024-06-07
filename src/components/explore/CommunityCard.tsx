'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Paragraph from '@/stories/Paragraph'
import { FamImage } from '@/components/shared'
import { Address } from 'viem'
import useCommunity from '@/hooks/useCommunity'
import getIpfsLink from '@/utils/getIpfsLink'

type CommunityCardProps = {
  community: Address
}

const CommunityCard = ({ community }: CommunityCardProps): JSX.Element => {
  const { network } = useParams()
  const { data, name } = useCommunity(community)

  return (
    <Link
      className="col-span-1 block h-full w-full grow"
      href={{
        pathname: `/community/${network}/${community}`,
      }}
      passHref
    >
      <div className="relative z-0 aspect-square w-full">
        <FamImage
          className="mx-auto h-auto w-full overflow-hidden rounded-lg object-cover"
          fill
          src={data?.image ? getIpfsLink(data?.image) : ''}
          alt={data?.name}
          sizes="50vw"
        />
      </div>
      <div className="grid justify-between gap-3 py-3">
        <Paragraph as="p3">{name}</Paragraph>
        <Paragraph as="p4" className="text-grey">
          {data?.name}
        </Paragraph>
      </div>
    </Link>
  )
}

export default CommunityCard
