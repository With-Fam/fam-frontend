<<<<<<< HEAD
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
=======
const USERS_TOGGLE_DATA = [
  {
    id: 'communities',
    title: 'Communities',
    href: '/user-profile/[user]?type=communities',
>>>>>>> origin/main
  },
  {
    id: 'activity',
    title: 'Activity',
<<<<<<< HEAD
    href: `/profile/${user}?type=activity`,
=======
    href: '/user-profile/[user]?type=activity',
>>>>>>> origin/main
  },
]

export default USERS_TOGGLE_DATA
