import { TextInput } from '@/components/forms'
import Image from 'next/image'

const MembershipPrice = () => {
  return (
    <div className="relative z-0 mt-4">
      <TextInput
        name="membershipPrice"
        type="number"
        step="0.0001"
        label="Membership price"
        placeholder="0.01 ETH"
        min={0.0001}
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border bg-grey-light p-0.5">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src="https://i.imgur.com/n93Kwtm.png" layout="fill" alt="" />
        </div>
        <p className="text-md pr-2 font-abcMedium text-black">ETH</p>
      </div>
    </div>
  )
}
export default MembershipPrice
