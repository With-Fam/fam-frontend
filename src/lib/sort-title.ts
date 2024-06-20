import { ActionItemProps } from '@/types/create-activity'

const sortByTitle = (array: ActionItemProps[]): ActionItemProps[] => {
  return array.slice().sort((a, b) => {
    const titleA = a.title.toUpperCase()
    const titleB = b.title.toUpperCase()

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })
}

export default sortByTitle
