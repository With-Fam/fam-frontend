import useCommunity from '@/hooks/useCommunity'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { Paragraph } from '@/stories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PartyCard = ({ partyInfo }: any) => {
  const { network } = useParams()
  const { data, name } = useCommunity(partyInfo)

  return (
    <Link href={`/community/${network}/${partyInfo?.party}`}>
      <div className="flex flex-col bg-white">
        {data && (
          <>
            <div className="flex aspect-[1/1] w-[200px] items-center justify-center overflow-hidden">
              <Image
                src={getPartyDaoIpfsLink(data?.image)}
                alt=""
                width={200}
                height={200}
              />
            </div>
            <Paragraph as="p3" className="mt-2 text-wrap">
              {name}
            </Paragraph>
            {data?.contributedEvent && (
              <Paragraph as="p5" className="text-grey">
                Joined{' '}
                {new Date(data.contributedEvent.timestamp).toDateString()}
              </Paragraph>
            )}
          </>
        )}
      </div>
    </Link>
  )
}

export default PartyCard
