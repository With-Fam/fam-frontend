import type { Meta, StoryObj } from '@storybook/react'

import PollComponent from '.'

const meta: Meta<typeof PollComponent> = {
  title: 'PollComponent',
  component: PollComponent,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof PollComponent>

export const Default: Story = {}
