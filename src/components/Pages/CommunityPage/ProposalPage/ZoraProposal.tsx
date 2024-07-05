import getIpfsLink from '@/lib/getIpfsLink'
import Image from 'next/image'
import { useState } from 'react'

const ZoraProposal = ({ info }: any) => {
  const [imgSrc, setImgSrc] = useState(getIpfsLink(info.collectionImage))
  const [isError, setIsError] = useState(false)

  const handleError = (event: any) => {
    if (!isError) {
      setImgSrc('/fallback-image.png')
      setIsError(true)
    }
  }


  return (
    <div className="flex w-fit items-center gap-2 rounded-md border p-4">
      <Image
        src={imgSrc}
        width={64}
        height={64}
        className="overflow-hidden rounded-md"
        alt=""
        onError={handleError}
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