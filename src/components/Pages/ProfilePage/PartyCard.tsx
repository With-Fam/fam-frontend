import { MONTH_LABELS } from '@/constants/consts'
import useCommunity from '@/hooks/useCommunity'
import useIsMobile from '@/hooks/useIsMobile'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { Paragraph } from '@/stories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PartyCard = ({ partyInfo }: any) => {
  const { network } = useParams()
  const { data, name } = useCommunity(partyInfo)
  const { isMobile } = useIsMobile()
  const joinedDate = new Date(data?.contributedEvent?.timestamp || 0)

  return (
    <Link href={`/community/${network}/${partyInfo?.party}`}>
      <div className="flex flex-row items-center gap-2 rounded-[8px] bg-white px-3 py-2 md:h-full md:flex-col">
        {data && (
          <>
            <div className="flex aspect-[1/1] w-[100px] items-center justify-center overflow-hidden rounded-[8px] md:w-[200px]">
              <Image
                src={getPartyDaoIpfsLink(data?.image)}
                alt=""
                width={isMobile ? 100 : 200}
                height={isMobile ? 100 : 200}
                className="overflow-hidden rounded-[8px]"
              />
            </div>
            <div className="space-y-2">
              <Paragraph as="p3" className="mt-2 text-wrap">
                {name}
              </Paragraph>
              {data?.contributedEvent && (
                <Paragraph as="p5" className="text-grey">
                  Joined {MONTH_LABELS[joinedDate.getMonth()]}{' '}
                  {joinedDate.getDate()}, {joinedDate.getFullYear()}
                </Paragraph>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default PartyCard
