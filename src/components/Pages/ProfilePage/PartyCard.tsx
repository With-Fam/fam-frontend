import { MONTH_LABELS } from '@/constants/consts'
import useCommunity from '@/hooks/useCommunity'
import useIsMobile from '@/hooks/useIsMobile'
import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import { Paragraph } from '@/stories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PartyCard = ({ partyInfo }: any) => {
  const { network } = useParams()
  const { isMobile } = useIsMobile()
  const joinedDate = new Date(partyInfo.joinedAt)
  const { name } = useCommunity(partyInfo?.address)

  return (
    <Link href={`/community/${network}/${partyInfo?.address}`}>
      <div className="flex flex-row items-center gap-2 rounded-[8px] bg-white px-3 py-2 md:h-full md:flex-col">
        {partyInfo && (
          <>
            <div className="flex aspect-[1/1] w-[100px] items-center justify-center overflow-hidden rounded-[8px] md:w-[200px]">
              <Image
                src={ipfsGatewayUrl(partyInfo?.image) as any}
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
              {partyInfo && (
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
