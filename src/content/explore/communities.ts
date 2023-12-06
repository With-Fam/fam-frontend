export type Community = {
  slug: string
  image: string
  imageAlt: string
  title: string
  value: string
  users: Array<string>
  text: string
  type: string
}

const COMMUNITIES_DATA: Array<Community> = [
  {
    slug: 'pc-music-club',
    image: '/assets/images/explore/e1.jpeg',
    imageAlt: '',
    title: 'PC Music Club',
    value: '2,435 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+3,304 others',
    type: 'trending',
  },
  {
    slug: 'alfa-mist',
    image: '/assets/images/explore/e2.png',
    imageAlt: '',
    title: 'Alfa Mist',
    value: '12 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+500 others',
    type: 'trending',
  },
  {
    slug: 'soulection',
    image: '/assets/images/explore/e3.jpeg',
    imageAlt: '',
    title: 'Soulection',
    value: '25 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+230 others',
    type: 'trending',
  },
  {
    slug: 'warp-records',
    image: '/assets/images/explore/e4.png',
    imageAlt: '',
    title: 'Warp Records',
    value: '5,654 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+5,003 others',
    type: 'trending',
  },
  {
    slug: 'nvshu',
    image: '/assets/images/explore/e5.png',
    imageAlt: '',
    title: 'NVSHU',
    value: '2,530 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+30 others',
    type: 'trending',
  },
  {
    slug: 'boiler-room',
    image: '/assets/images/explore/e6.jpeg',
    imageAlt: '',
    title: 'Boiler Room',
    value: '45,065 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+13,450 others',
    type: 'trending',
  },
  {
    slug: '',
    image: '/assets/images/explore/e7.png',
    imageAlt: '',
    title: 'Trance Party',
    value: '0.4 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+30 others',
    type: 'new',
  },
  {
    slug: '',
    image: '/assets/images/explore/e8.jpeg',
    imageAlt: '',
    title: 'Ezra Collective',
    value: '1.3 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+18 others',
    type: 'new',
  },
  {
    slug: 'luna-li',
    image: '/assets/images/explore/e9.jpeg',
    imageAlt: '',
    title: 'Luna Li',
    value: '0.43 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+19 others',
    type: 'new',
  },
  {
    slug: '',
    image: '/assets/images/explore/e10.jpeg',
    imageAlt: '',
    title: 'Touching Bass',
    value: '2.65 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+65 others',
    type: 'new',
  },
  {
    slug: 'chaos',
    image: '/assets/images/explore/e11.jpeg',
    imageAlt: '',
    title: 'CHAOS',
    value: '120 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+77 others',
    type: 'new',
  },
  {
    slug: 'thelot-radio',
    image: '/assets/images/explore/e12.jpeg',
    imageAlt: '',
    title: 'TheLot Radio',
    value: '53 ETH',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+326 others',
    type: 'new',
  },
]

export default COMMUNITIES_DATA
