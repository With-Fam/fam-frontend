'use client'

import ActivityButton from '@/components/community/CommunityHeader/ActivityButton'
import TopMembers from '@/components/community/CommunityHeader/TopMembers'
import ShareButton from '@/components/community/CommunityHeader/ShareButton'
import Image from 'next/image'

const CommunityHeader = () => {
  return (
    <section
      className="relative mx-auto max-w-[936px]
      space-y-6 px-4 pb-0 sm:pb-2"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full md:h-16 md:w-16">
          <Image src="/assets/images/community/m4.jpeg" alt="" layout="fill" />
        </div>
        <div className="space-y-1">
          <p className="text-md font-abcWide md:text-2xl">PC Music Club</p>
          <p className="text-md font-abc text-grey md:hidden">23,450 members</p>
        </div>
      </div>
      <div className="hidden w-full justify-between md:flex">
        <TopMembers />
        <div className="flex items-center gap-2">
          <ShareButton />
          <ActivityButton />
        </div>
      </div>
    </section>
  )
}

export default CommunityHeader
