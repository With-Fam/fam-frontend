import Socials from '@/components/Pages/CommunityPage/AboutPage/Socials'
import PartyImage from '@/components/Pages/PartyImage'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import { Paragraph } from '@/stories'

const Description = () => {
  const { partyInfo } = useCommunityProvider() as any
  return (
    <div className="p-3">
      <div className="flex items-center gap-2">
        {partyInfo?.image && <PartyImage imageUrl={partyInfo?.image} />}
        <p className="text-md font-abcWide md:text-2xl">
          {partyInfo?.name || ''}
        </p>
      </div>
      <Paragraph as="p3" className="mt-3 break-all font-abc">
        {partyInfo?.description}
      </Paragraph>
      <Socials />
    </div>
  )
}

export default Description
