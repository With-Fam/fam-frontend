import WebsiteIcon from '@/components/Pages/CommunityPage/AboutPage/WebsiteIcon'
import { useCommunityProvider } from '@/contexts/CommunityProvider'
import formatPartyExternalUrl from '@/lib/formatPartyExternalUrl'
import Link from 'next/link'

const Socials = () => {
  const { partyInfo } = useCommunityProvider() as any

  return (
    <section className="flex items-center gap-2 pt-4">
      <Link
        href={formatPartyExternalUrl(partyInfo?.external_url)}
        target="_blank"
      >
        <WebsiteIcon />
      </Link>
    </section>
  )
}

export default Socials
