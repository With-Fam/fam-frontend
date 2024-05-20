import type { Meta, StoryObj } from '@storybook/react'

import TrendingCard from '.'

const meta: Meta<typeof TrendingCard> = {
  title: 'TrendingCard',
  component: TrendingCard,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    image: '/assets/images/trending/t1.jpeg',
    imageAlt: '',
    title: 'Soulection',
    value: '135 ETH',
<<<<<<< HEAD
    slug: 'soul',
=======
    href: '#',
>>>>>>> origin/main
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
    text: '+ 230 others',
  },
}
