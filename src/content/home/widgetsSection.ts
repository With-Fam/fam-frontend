const WIDGET_DATA = [
  {
    imageAlt: '',
    title: 'Collaborate onchain',
    description: 'Create a community for your collective, label or fan club',
    service: {
      type: 'community',
      cards: [
        {
          title: 'Create a label',
          image: '/assets/images/widgets/wc1.png',
          description:
            'Start an onchain record label that all members can contribute to',
        },
        {
          title: 'Build a fan club',
          image: '/assets/images/widgets/wc2.png',
          description: 'A community for your favourite artist, band or genre',
        },
        {
          title: 'Start a collective',
          image: '/assets/images/widgets/wc3.png',
          description:
            'Collaborate with likeminded people and release music together',
        },
      ],
    },
  },
  {
    imageAlt: '',
    title: 'Grow your squad',
    description: 'A new membership pass is auctioned every day',
    service: {
      type: 'membership',
      image: '/assets/images/widgets/w2.png',
      title: 'PC Music Club #22',
    },
  },
  {
    imageAlt: '',
    title: 'Collective decisions',
    description: 'Members propose ideas and vote on which activities to fund',
    service: {
      type: 'poll',
      text: '23 votes',
      users: [
        '/assets/images/users/u1.jpeg',
        '/assets/images/users/u2.jpeg',
        '/assets/images/users/u3.jpeg',
        '/assets/images/users/u4.jpeg',
      ],
    },
  },
]

export default WIDGET_DATA
