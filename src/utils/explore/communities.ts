// Types
interface FilterProps {
  type: string
  search: string
}

<<<<<<< HEAD
export interface CommunityProps {
=======
interface CommunityProps {
>>>>>>> origin/main
  image: string
  imageAlt: string
  title: string
  value: string
<<<<<<< HEAD
  users: string[]
  slug: string
  text: string
  type?: string
=======
  href: string
  users: string[]
  text: string
  type: string
>>>>>>> origin/main
}

// Content
import { COMMUNITIES_DATA } from '@/content/explore'

/*--------------------------------------------------------------------*/

/**
 * Function
 */

export const filterCommunities = ({
  type,
  search,
}: FilterProps): CommunityProps[] => {
  let filteredCommunities = COMMUNITIES_DATA

  filteredCommunities = filteredCommunities.filter((community) => {
    return community.type === type
  })

  if (search.length > 0) {
    filteredCommunities = filteredCommunities.filter((community) => {
      return community.title.toLowerCase().includes(search.toLowerCase())
    })
  }

  return filteredCommunities
}

export default filterCommunities
