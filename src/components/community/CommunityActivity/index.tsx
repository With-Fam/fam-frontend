'use client'

// Local Components
import ActivitysComments from '@/components/community/CommunityActivity/ActivityComments'
import ActivityDescription from '@/components/community/CommunityActivity/ActivityDescription'
import VotingComponent from '@/components/community/CommunityActivity/VotingComponent'
import ActivityData from '@/components/community/CommunityActivity/ActivityData'
import { CreateActivityButton } from '@/components/community'

// Contenxt
import { useMockStoreContext } from '@/contexts/mock-store'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityActivity = (): JSX.Element => {
  const { actions } = useMockStoreContext()
  return (
    <section
      className="relative mx-auto max-w-[936px]
px-4 pb-4 sm:pb-10"
    >
      {actions.map((item, index) => {
        return (
          <div
            key={index}
            className="relative z-0 mb-2 rounded-lg bg-white p-4"
          >
            <div className="flex gap-4">
              <VotingComponent
                votes={item.votes}
                active={!Boolean(item.status)}
              />
              <div className="w-full">
                <ActivityData item={item} />
                <ActivityDescription>{item.description}</ActivityDescription>
                <ActivitysComments comments={item.comments} />
              </div>
            </div>
          </div>
        )
      })}
      <CreateActivityButton />
    </section>
  )
}

export default CommunityActivity
