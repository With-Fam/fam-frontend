'use client'
// Framework
import Link from 'next/link'
import Member from './Member'

// Helpers
import { useChainStore } from '@/utils/stores/useChainStore'
import { Address } from 'viem'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

interface CommunityMembersProps {
  data: {
    daotokenOwners: any[]
  }
}

const CommunityMembers = ({ data }: CommunityMembersProps): JSX.Element => {
  // Deploy no members component
  const chain = useChainStore((x) => x.chain)
  if (data?.daotokenOwners.length === 0) return <h1>No members</h1>

  const mockdata = {
    daotokenOwners: [
      '0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38',
      '0x089036a0835C6cF82e7fC42e9e95DfE05e110c81',
      '0x51027631B9DEF86e088C33368eC4E3A4BE0aD264',
    ],
  }

  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 pb-4 sm:pb-10"
    >
      {mockdata?.daotokenOwners.map((member, index) => {
        return (
          <Link
            // remove hardcoded goerli
            href={`/profile/${chain.slug}/${member}`}
            key={index}
            className="mb-2 block rounded-lg bg-white p-4 sm:flex sm:items-center sm:justify-between"
          >
            <Member address={member as Address} />
          </Link>
        )
      })}
    </section>
  )
}

export default CommunityMembers
