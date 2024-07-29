import WebsiteIcon from '@/components/Pages/CommunityPage/AboutPage/WebsiteIcon'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import Link from 'next/link'

const Socials = () => {
  const { partyInfo } = useCommunityProvider() as any
  return (
    <section className="flex items-center gap-2 pt-4">
      <Link href={partyInfo?.external_url || '#'} target="_blank">
        <WebsiteIcon />
      </Link>
    </section>
  )
}

export default Socials
