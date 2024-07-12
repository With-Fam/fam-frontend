import useCommunity from '@/hooks/useCommunity'
import useIsMobile from '@/hooks/useIsMobile'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { Paragraph } from '@/stories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PartyCard = ({ partyInfo }: any) => {
  const { network } = useParams()
  const { isMobile } = useIsMobile()
  const { name } = useCommunity(partyInfo.address)

  return (
    <Link href={`/community/${network}/${partyInfo?.address}`}>
      <div className="flex flex-row items-center gap-2 bg-white md:flex-col">
        {partyInfo && (
          <>
            <div className="flex aspect-[1/1] w-[80px] items-center justify-center overflow-hidden md:w-[200px]">
              <Image
                src={getPartyDaoIpfsLink(partyInfo?.image)}
                alt=""
                width={isMobile ? 80 : 200}
                height={isMobile ? 80 : 200}
              />
            </div>
            <div>
              <Paragraph as="p3" className="text-wrap">
                {partyInfo?.name || name}
              </Paragraph>
              <Paragraph as="p5" className="text-grey">
                {isMobile ? 'Since' : 'Joined'}&nbsp;
                {new Date(partyInfo.joinedAt).toDateString()}
              </Paragraph>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default PartyCard
