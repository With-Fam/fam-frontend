// Local Components
import ActionsComments from '@/components/community-profile/CommunityActions/ActionsComments'
import ActionDescription from '@/components/community-profile/CommunityActions/ActionDescription'
import VotingComponent from '@/components/community-profile/CommunityActions/VotingComponent'
import ActionData from '@/components/community-profile/CommunityActions/ActionData'

// Content
import { ACTIONS_DATA } from '@/content/community-profile'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityActions = (): JSX.Element => (
  <section
    className="relative mx-auto max-w-[936px]
px-4 pb-4 sm:pb-10"
  >
    {ACTIONS_DATA.map((item, index) => {
      return (
        <div key={index} className="relative z-0 mb-2 rounded-lg bg-white p-4">
          <div className="flex gap-4">
            <VotingComponent votes={item.votes} />
            <div className="w-full">
              <ActionData item={item} />
              <ActionDescription>{item.description}</ActionDescription>
              <ActionsComments comments={item.comments} />
            </div>
          </div>
        </div>
      )
    })}
  </section>
)

export default CommunityActions
