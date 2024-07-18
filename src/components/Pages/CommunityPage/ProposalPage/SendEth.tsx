import EnsAddress from '@/components/shared/EnsAddress'
import Image from 'next/image'
import { formatEther } from 'viem'

const SendEth = ({ info }: any) => {
  return (
    <div className="flex w-fit items-center gap-4 rounded-md border p-4">
      <div className="relative aspect-[1/1] w-[64px]">
        <Image
          className="absolute left-0 top-0 size-full rounded-lg"
          layout="fill"
          src="/assets/images/create-activity/sendFund-mobile.svg"
          alt="not found icon"
        />
      </div>
      <div className="space-y-2">
        <p className="font-abcMedium text-[20px]">{info.title}</p>
        <p className="font-abc text-[16px] text-grey">
          To: <EnsAddress address={info.receiver} />
        </p>
        <p className="font-abc text-[16px] text-grey">
          Amount: {formatEther(info.value)} ETH
        </p>
      </div>
    </div>
  )
}

export default SendEth
