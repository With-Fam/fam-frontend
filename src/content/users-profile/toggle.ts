type UserDataProps = string

type UserNavigationResponse = {
  id: string;
  title: string;
  href: string
}

const USERS_TOGGLE_DATA = (user: UserDataProps): UserNavigationResponse[] => [
  {
    id: 'communities',
    title: 'Communities',
    href: `/profile/${user}?type=communities`,
  },
  {
    id: 'activity',
    title: 'Activity',
    href: `/profile/${user}?type=activity`,
  },
]

export default USERS_TOGGLE_DATA
