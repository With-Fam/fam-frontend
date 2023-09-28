// Framework
import Image from 'next/image'

// Local Components
import { Paragraph } from '@/stories'

// Content
import MEMBERS_DATA from '@/content/community-profile/members'

// Utils
import { formatDate } from '@/utils/community-profile'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityMembers = (): JSX.Element => {
  const sortedFounders = MEMBERS_DATA.sort((a, b) => b.votes - a.votes)
  return (
    <section
      className="relative mx-auto max-w-[936px]
      px-4 py-4 sm:py-10"
    >
      {sortedFounders.map((member, index) => {
        return (
          <div key={index} className="mb-2 rounded-lg bg-white p-4 block sm:flex sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0 flex items-center justify-start gap-2">
              <Image
                src={member.image.href}
                alt={member.image.alt}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <Paragraph as="p3" className="flex items-center gap-1">
                {member.name}
              </Paragraph>
              {member.founder && (
                <p
                  className="h-min rounded-3xl px-2 py-1 text-xs text-orange"
                  style={{ backgroundColor: 'rgba(245, 77, 24, 0.10)' }}
                >
                  Founder
                </p>
              )}
            </div>
            <div className="flex items-center justify-between flex-1 pl-0 sm:pl-6">
              <Paragraph as="p4" className="text-grey">
                Joined {formatDate(member.joinedDate)}
              </Paragraph>
              <Paragraph as="p4" className="text-grey flex-0 sm:flex-1 text-center sm:text-right px-0 sm:px-8">
                {member.votes} votes
              </Paragraph>
              <Paragraph as="p4" className="text-grey">
                {member.shareOfVotes}
              </Paragraph>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default CommunityMembers
