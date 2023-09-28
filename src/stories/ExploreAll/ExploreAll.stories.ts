import type { Meta, StoryObj } from '@storybook/react'

import ExploreAll from '.'

const meta: Meta<typeof ExploreAll> = {
  title: 'ExploreAll',
  component: ExploreAll,
  tags: ['autodocs'],
  args: {
    children: 'Recent drops',
    href: "/community-profile?type=drops"
  },
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof ExploreAll>

export const Default: Story = {}
