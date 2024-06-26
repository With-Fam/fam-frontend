import useCommunity from '@/hooks/useCommunity'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { Paragraph } from '@/stories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PartyCard = ({ party }: any) => {
  const { network } = useParams()
  const { data, name } = useCommunity(party)

  return (
    <Link href={`/community/${network}/${party}`}>
      <div className="flex flex-col items-center gap-2">
        {data && (
          <>
            <div className="flex aspect-[1/1] w-[200px] items-center justify-center">
              <Image
                src={getPartyDaoIpfsLink(data?.image)}
                alt=""
                width={200}
                height={200}
              />
            </div>
            <Paragraph as="p3" className="text-wrap">
              {name}
            </Paragraph>
            <p className="text-wrap break-words text-grey">{data?.name}</p>
          </>
        )}
      </div>
    </Link>
  )
}

export default PartyCard
