import { Icon } from '@/components/Icon'
import { Paragraph } from '@/stories'
import Image from 'next/image'

const General = () => {
  return (
    <section className="rounded-md bg-white p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Image
            src="https://i.imgur.com/94JxQHK.png"
            width={16}
            height={16}
            alt=""
          />
          <Paragraph as="p5" className="text-gray-dark">
            dannylharle.eth
          </Paragraph>
          <p className="font-abc text-[12px] text-grey">1d ago</p>
        </div>
        <div className="flex items-center gap-1">
          <Icon id="archieve" fill="#ffffff" />
          <Paragraph as="p5" className="text-status-purple">
            Voting
          </Paragraph>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <p className="font-abcMedium text-black">PC044 Drop</p>
        <div className="rounded-full bg-orange-light px-3 py-1">
          <p className="text-[12px] text-orange">23hr 14m</p>
        </div>
      </div>
      <Paragraph as="p4" className="mt-4 font-abcMedium">
        {`PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`}
      </Paragraph>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center gap-1">
          <Icon id="check" fill="#45D039" />
          <Paragraph as="p5" className="text-grey">
            28 Votes
          </Paragraph>
        </div>
        <div className="flex items-center gap-1">
          <Icon id="comment" fill="#ffffff" />
          <Paragraph as="p5" className="text-grey">
            14 comments
          </Paragraph>
        </div>
      </div>
    </section>
  )
}

export default General
