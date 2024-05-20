// Local Components
<<<<<<< HEAD
import CommunityCard from '@/components/explore/CommunityCard'
import { ExploreDaosPageQuery } from '@/data/subgraph/sdk.generated'
import { Paragraph } from '@/stories'

// Types
interface CommunitiesProps {
  items: ExploreDaosPageQuery['auctions']
}

=======
import { Paragraph, TrendingCard } from '@/stories'

// Types
interface CommunitiesProps {
  type: string
  search: string
}

// Utils
import { filterCommunities } from '@/utils/explore'

>>>>>>> origin/main
/*--------------------------------------------------------------------*/

/**
 * Component
 */

<<<<<<< HEAD
const Communities = ({ items }: CommunitiesProps): JSX.Element => {
  return (
    <section className="block px-4">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((community, index) => {
          return (
            <div
              key={index}
              className="rounder-2xl mx-auto h-auto w-full max-w-sm bg-white p-3 sm:mx-0 sm:w-auto sm:max-w-none"
            >
              <CommunityCard community={community} />
=======
const Communities = ({
  type = 'trending',
  search = '',
}: CommunitiesProps): JSX.Element => {
  const communities = filterCommunities({ type, search })

  return (
    <section className="block px-4">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 justify-center gap-8 md:grid-cols-3">
        {communities.map((community, index) => {
          const { image, title, value, users, text, imageAlt, href } = community
          return (
            <div key={index} className="rounder-2xl w-auto bg-white p-3">
              <TrendingCard
                image={image}
                title={title}
                value={value}
                users={users}
                text={text}
                imageAlt={imageAlt}
                href={href}
              />
>>>>>>> origin/main
            </div>
          )
        })}
      </div>
<<<<<<< HEAD
      {items.length === 0 && (
=======
      {communities.length === 0 && (
>>>>>>> origin/main
        <Paragraph as="p3" className="text-center">
          No communities found.
        </Paragraph>
      )}
    </section>
  )
}
export default Communities
