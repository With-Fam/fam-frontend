// Types
interface CommunitiesProps {
  type: string
  search: string
}

// Content
import COMMUNITIES_DATA from '@/content/explore/communities'

/*--------------------------------------------------------------------*/

/**
 * Function
 */

export const filterCommunities = ({ type, search }: CommunitiesProps) => {
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
