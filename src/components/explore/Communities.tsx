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
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 justify-center gap-8 md:grid-cols-3">
        {communities.map((community, index) => {
          const { image, title, value, users, text, imageAlt, slug } = community
          return (
            <div key={index} className="rounder-2xl w-auto bg-white p-3">
              <TrendingCard
                image={image}
                title={title}
                value={value}
                users={users}
                text={text}
                slug={slug}
                imageAlt={imageAlt}
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
