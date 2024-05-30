'use client'

import JoinButton from '@/components/community/CommunityHeader/JoinButton'
import TopMembers from '@/components/community/CommunityHeader/TopMembers'
import UploadButton from '@/components/community/CommunityHeader/UploadButton'
import Image from 'next/image'

const CommunityHeader = () => {
  return (
    <section
      className="relative mx-auto max-w-[936px]
      space-y-6 px-4 pb-4 sm:pb-2"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/assets/images/community/m4.jpeg"
          alt=""
          className="rounded-full"
          width={60}
          height={60}
        />
        <p className="font-abcWide text-2xl">PC Music Club</p>
      </div>
      <div className="flex w-full justify-between">
        <TopMembers />
        <div className="flex items-center gap-2">
          <UploadButton />
          <JoinButton />
        </div>
      </div>
    </section>
  )
}

export default CommunityHeader
