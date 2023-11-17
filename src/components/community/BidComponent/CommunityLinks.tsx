// Local Components
import CustomLink from '@/components/community/BidComponent/CustomLink'

// Content
import { LINKS_DATA } from '@/content/community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunityLinks = (): JSX.Element => (
  <div className="flex gap-4">
    {LINKS_DATA.map((link, index) => {
      return (
        <CustomLink
          key={index}
          href={link.href}
          aria-label={`Opens ${link.title}`}
        >
          {link.icon}
        </CustomLink>
      )
    })}
  </div>
)

export default CommunityLinks
