// Local Components
import { Paragraph, TrendingCard } from '@/stories'

// Types
interface CommunitiesProps {
  type: string
  search: string
}

// Utils
import { filterCommunities } from '@/utils/explore'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Communities = ({
  type = 'trending',
  search = '',
}: CommunitiesProps): JSX.Element => {
  const communities = filterCommunities({ type, search })

  return (
    <section className="block px-4">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center">
        {communities.map((community, index) => {
          const { image, title, value, users, text, imageAlt, href } = community
          return (
            <div key={index} className="rounder-2xl w-min bg-white p-3">
              <TrendingCard
                image={image}
                title={title}
                value={value}
                users={users}
                text={text}
                imageAlt={imageAlt}
                href={href}
              />
            </div>
          )
        })}
      </div>
      {communities.length === 0 && (
        <Paragraph as="p3" className="text-center">
          No communities found.
        </Paragraph>
      )}
    </section>
  )
}
export default Communities
