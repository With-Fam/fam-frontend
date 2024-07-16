import CommunityCard from '@/components/explore/CommunityCard'
import { Paragraph } from '@/stories'
import { Address } from 'viem'

interface CommunitiesProps {
  items: Array<Address>
}

const Communities = ({ items }: CommunitiesProps): JSX.Element => {
  return (
    <section className="block px-4">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((community, index) => {
          return (
            <div
              key={index}
              className="rounded-2xl mx-auto h-auto w-full max-w-sm bg-white p-3 sm:mx-0 sm:w-auto sm:max-w-none"
            >
              <CommunityCard community={community} />
            </div>
          )
        })}
      </div>
      {items.length === 0 && (
        <Paragraph as="p3" className="text-center">
          No communities found.
        </Paragraph>
      )}
    </section>
  )
}
export default Communities
