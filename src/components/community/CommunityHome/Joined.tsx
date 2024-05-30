import { Paragraph } from '@/stories'
import Image from 'next/image'

const Joined = () => {
  return (
    <section className="mt-4 rounded-md bg-white p-4">
      <div className="flex items-center gap-1">
        <Image
          src="https://i.imgur.com/sMR7vuY.png"
          width={24}
          height={24}
          alt=""
        />
        <Paragraph as="p5" className="font-abcMedium text-black">
          easyfun.eth
        </Paragraph>
        <Paragraph as="p5" className="text-grey">
          joined
        </Paragraph>
        <div className="flex items-center gap-1">
          <div className="relative h-3 w-3 overflow-hidden rounded-full">
            <Image
              src="/assets/images/community/m4.jpeg"
              alt=""
              layout="fill"
            />
          </div>
          <p className="text-md font-abcWide text-[14px]">PC Music Club</p>
        </div>
        <p className="font-abcMedium text-[12px] text-grey">1d ago</p>
      </div>
    </section>
  )
}

export default Joined
