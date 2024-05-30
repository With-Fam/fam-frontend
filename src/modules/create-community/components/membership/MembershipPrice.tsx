import { TextInput } from "@/components/forms"
import Image from "next/image"

const MembershipPrice = () => {
    return (
        <div className="relative z-0 mt-4">
          <TextInput
            name="membership price"
            type="number"
            step="0.01"
            label="Membership price"
            placeholder="0.01 ETH"
          />
          <div className='absolute flex gap-1 items-center right-3 bottom-3 border rounded-full p-0.5 bg-grey-light'>
            <div className='w-8 h-8 relative rounded-full overflow-hidden'>
              <Image
                src="https://i.imgur.com/n93Kwtm.png"
                layout='fill'
                alt=""
              />
            </div>
            <p className='font-abcMedium text-md text-black pr-2'>ETH</p>
          </div>
        </div>
    )
}
export default MembershipPrice