'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useChainStore } from '@/utils/stores/useChainStore'
import { Paragraph } from '@/stories'
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

interface CommunityMembersProps {
  data: {
    daotokenOwners: any[]
  }
}

const CommunityMembers = ({ data }: CommunityMembersProps): JSX.Element => {
  const chain = useChainStore((x) => x.chain)
  if (data?.daotokenOwners.length === 0) return <h1>No members</h1>
  const total = data?.daotokenOwners.reduce((acc, member) => {
    return acc + member.daoTokenCount
  }, 0)
  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 pb-4 sm:pb-10"
    >
      {data?.daotokenOwners.map((member, index) => {
        return (
          <Link
            // remove hardcoded goerli
            href={`/profile/${chain.slug}/${member.owner}`}
            key={index}
            className="mb-2 block rounded-lg bg-white p-4 sm:flex sm:items-center sm:justify-between"
          >
            <div className="mb-4 flex items-center justify-start gap-2 sm:mb-0">
              <UserAvatar width={24} height={24} address={member} />
              <UserName className="flex items-center gap-1" address={member} />
            </div>
            <div className="flex flex-1 items-center justify-between pl-0 sm:pl-6">
              <Paragraph
                as="p4"
                className="flex-0 px-0 text-center text-grey sm:flex-1 sm:px-8 sm:text-right"
              >
                X votes
              </Paragraph>
              <Paragraph as="p4" className="text-grey">
                %
              </Paragraph>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export default CommunityMembers
