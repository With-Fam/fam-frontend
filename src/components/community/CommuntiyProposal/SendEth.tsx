import EnsAddress from '@/components/shared/EnsAddress'
import { formatEther } from 'viem'

const SendEth = ({ info }: any) => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-md border p-4">
      <div className="space-y-2">
        <p className="font-abcMedium text-[20px]">{info.title}</p>
        <p className="font-abc text-[16px] text-grey">
          From: <EnsAddress address={info.sender} />
        </p>
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
