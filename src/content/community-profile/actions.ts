interface DataProps {
  href: string
  date: string
  title: string
  votes: number
  status: null | 'passed' | 'rejected'
  description: string
  users: string[]
  creator: {
    image: string
    name: string
  }
  comments: string[]
}

const ACTIONS_DATA: DataProps[] = [
  {
    href: '#',
    date: '2023-07-23',
    title: 'PC044 Drop',
    votes: 18,
    status: null,
    description: `PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`,
    users: [
      '/assets/images/community-profile/m1.jpeg',
      '/assets/images/community-profile/m2.jpeg',
      '/assets/images/community-profile/m3.jpeg',
      '/assets/images/community-profile/m4.jpeg',
    ],
    creator: {
      image: '/assets/images/community-profile/m1.jpeg',
      name: 'dannylharle.eth',
    },
    comments: [
      'This is a comment',
      'This is a comment',
      'This is a comment',
      'This is a comment',
    ],
  },
  {
    href: '#',
    date: '2023-07-23',
    title: 'PC Artist Grants October 23',
    votes: 12,
    status: null,
    description: `PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`,
    users: [
      '/assets/images/community-profile/m1.jpeg',
      '/assets/images/community-profile/m2.jpeg',
      '/assets/images/community-profile/m3.jpeg',
      '/assets/images/community-profile/m4.jpeg',
    ],
    creator: {
      image: '/assets/images/community-profile/m2.jpeg',
      name: 'agcook.eth',
    },
    comments: [
      'This is a comment',
      'This is a comment',
      'This is a comment',
      'This is a comment',
    ],
  },
  {
    href: '#',
    date: '2023-07-23',
    title: 'PC Music Stage @ Fest 24',
    votes: 21,
    status: 'passed',
    description: `PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`,
    users: [
      '/assets/images/community-profile/m1.jpeg',
      '/assets/images/community-profile/m2.jpeg',
      '/assets/images/community-profile/m3.jpeg',
      '/assets/images/community-profile/m4.jpeg',
    ],
    creator: {
      image: '/assets/images/community-profile/m3.jpeg',
      name: 'hyd.eth',
    },
    comments: [
      'This is a comment',
      'This is a comment',
      'This is a comment',
      'This is a comment',
    ],
  },
  {
    href: '#',
    date: '2023-07-23',
    title: 'Japan Tour Winter 2023',
    votes: 16,
    status: 'rejected',
    description: `PC Music has a storied history of disrupting the music scene, continuously pushing the boundaries of what's possible in the worlds of electronic and pop music. With the 44th release, we plan to take another quantum leap, further solidifying our reputation as pioneers in musical innovation.`,
    users: [
      '/assets/images/community-profile/m1.jpeg',
      '/assets/images/community-profile/m2.jpeg',
      '/assets/images/community-profile/m3.jpeg',
      '/assets/images/community-profile/m4.jpeg',
    ],
    creator: {
      image: '/assets/images/community-profile/m4.jpeg',
      name: 'easyfun.eth',
    },
    comments: [
      'This is a comment',
      'This is a comment',
      'This is a comment',
      'This is a comment',
    ],
  },
]

export default ACTIONS_DATA
