import type { Meta, StoryObj } from '@storybook/react'

import Toggle from '.'

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/explore',
        query: {
          type: 'trending',
        },
      },
    },
  },
  args: {
    items: [
      {
        id: 'trending',
        title: 'Trending',
        href: '',
      },
      {
        id: 'new',
        title: 'New',
        href: '',
      },
    ],
  },
}
