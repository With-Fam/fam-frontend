// Framework
import Image from 'next/image'

// Local Components
import { Paragraph } from '@/stories'
import ENSname from '@/components/community/ENSname'

// Content
import { MEMBERS_DATA } from '@/content/community'

// Utils
import { formatDate } from '@/utils/shared'

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
          <div
            key={index}
            className="mb-2 block rounded-lg bg-white p-4 sm:flex sm:items-center sm:justify-between"
          >
            <div className="mb-4 flex items-center justify-start gap-2 sm:mb-0">
              {/* <Image
                src={member.image.href}
                alt={member.image.alt}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              /> */}
              <ENSname owner={member.owner} />
              {/* {member.founder && (
                <p
                  className="h-min rounded-3xl px-2 py-1 text-xs text-orange"
                  style={{ backgroundColor: 'rgba(245, 77, 24, 0.10)' }}
                >
                  Founder
                </p>
              )} */}
            </div>
            <div className="flex flex-1 items-center justify-between pl-0 sm:pl-6">
              {/* <Paragraph as="p4" className="text-grey">
                Joined {formatDate(member.joinedDate)}
              </Paragraph> */}
              <Paragraph
                as="p4"
                className="flex-0 px-0 text-center text-grey sm:flex-1 sm:px-8 sm:text-right"
              >
                {member.daoTokenCount} votes
              </Paragraph>
              <Paragraph as="p4" className="text-grey">
                {((member.daoTokenCount / total) * 100).toFixed(2)}%
              </Paragraph>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default CommunityMembers
