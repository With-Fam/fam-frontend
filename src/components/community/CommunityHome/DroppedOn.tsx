import CollectButton from './CollectButton'
import TopMembers from './TopMembers'
import { Paragraph } from '@/stories'
import Image from 'next/image'

const Joined = () => {
  return (
    <section className="mt-4 rounded-md bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
        <div className="flex items-center gap-1">
          <Image
            src="/assets/images/community/m4.jpeg"
            width={24}
            height={24}
            alt=""
            className="rounded-full"
          />
          <Paragraph as="p5" className="font-abcMedium text-black">
            PC Music
          </Paragraph>
          <Paragraph as="p5" className="text-grey">
            dropped on
          </Paragraph>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <div className="relative h-3 w-3 overflow-hidden rounded-full">
              <Image
                src="https://i.imgur.com/dUT17tj.png"
                alt=""
                layout="fill"
              />
            </div>
            <p className="text-md font-abcWide text-[14px]">Crowdmuse</p>
          </div>
          <p className="font-abcMedium text-[12px] text-grey">2d ago</p>
        </div>
      </div>
      <div className="relative mt-4 aspect-[636/385] w-full">
        <Image src="https://i.imgur.com/RFv9dmO.png" layout="fill" alt="" />
      </div>
      <p className="my-4 font-abcMedium text-[16px] text-black">
        HYD Limited Edition Viny!
      </p>
      <div className="flex items-center justify-between">
        <TopMembers />
        <CollectButton />
      </div>
    </section>
  )
}

export default Joined
