// Local Components
import { Paragraph } from '@/stories'
import { CommunityTypeCard } from '@/components/create-community'

// Content
import { NEW_COMMUNITY_DATA } from '@/content/create-community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const StartPhase = (): JSX.Element => (
  <section>
    <Paragraph as="p4" className="mt-0 text-grey-dark sm:mt-40">
      What kind of community would you like to create?
    </Paragraph>
    <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-0 sm:mt-0 sm:flex-row sm:gap-6">
      {NEW_COMMUNITY_DATA.map((item, index) => (
        <CommunityTypeCard key={index} item={item} />
      ))}
    </div>
  </section>
)

export default StartPhase
