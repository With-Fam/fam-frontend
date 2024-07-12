import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import Image from 'next/image'

const ZoraProposal = ({ info }: any) => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-md border p-4">
      <Image
        src={getPartyDaoIpfsLink(info.collectionImage)}
        width={64}
        height={64}
        className="overflow-hidden rounded-md"
        alt=""
      />
      <div className="space-y-1">
        <p className="font-abcMedium text-[20px]">{info.title}</p>
        <p className="font-abc text-[16px]">{info.collectionName}</p>
      </div>
    </div>
  )
}

export default ZoraProposal
