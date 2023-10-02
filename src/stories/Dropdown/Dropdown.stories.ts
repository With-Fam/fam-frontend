import type { Meta, StoryObj } from '@storybook/react'

import Dropdown from '.'

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    children: 'This is a Dropdown',
  },
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    question: 'Daily auctions',
    children:
      'Each day a new community membership is auctioned, forever. 100%* of the auction proceeds go into a shared poll and each membership equals 1 vote. The winning bidder will be able to join the community, propose new projects and vote on which ideas to fund.',
  },
}
