// Framework
'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Types
import { ExploreDaoFragment } from '@/data/subgraph/sdk.generated'
type CommunityCardProps = {
  community: ExploreDaoFragment
}

// Components
import Paragraph from '@/stories/Paragraph'
import { FamImage } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityCard = ({ community }: CommunityCardProps): JSX.Element => {
  const { network } = useParams()
  return (
    <Link
      className="col-span-1 block h-full w-full grow"
      href={{
        pathname: `/community/${network}/${community.dao.tokenAddress}`,
      }}
      passHref
    >
      <div className="relative z-0 aspect-square w-full">
        <FamImage
          className="mx-auto h-auto w-full overflow-hidden rounded-lg object-cover"
          fill
          src={community?.token?.image ? community?.token?.image : ''}
          alt={community.token.name}
          sizes="50vw"
        />
      </div>
      <div className="grid justify-between gap-3 py-3">
        <Paragraph as="p3">{community.dao.name}</Paragraph>
        <Paragraph as="p4" className="text-grey">
          {community.token.name}
        </Paragraph>
      </div>
    </Link>
  )
}

export default CommunityCard
