import getIpfsLink from '@/utils/getIpfsLink'
import Image from 'next/image'

const ZoraProposal = ({ info }: any) => {
  return (
    <div className="flex items-center gap-2 border p-4 w-fit rounded-md">
      <Image
        src={getIpfsLink(info.collectionImage)}
        width={64}
        height={64}
        className="overflow-hidden rounded-md"
        alt=""
      />
      <div className="space-y-1">
        <p className="font-abcMedium text-[20px]">{info.title}</p>
        <p className="font-abc text-[16px]">{info.collectionName}</p>
        <p className="font-abc text-[14px] text-grey">{info.collectionDesc}</p>
      </div>
    </div>
  )
}

export default ZoraProposal
