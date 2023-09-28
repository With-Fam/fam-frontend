import type { Meta, StoryObj } from '@storybook/react'

import NavigationButton from '.'

const meta: Meta<typeof NavigationButton> = {
  title: 'NavigationButton',
  component: NavigationButton,
  tags: ['autodocs'],
  args: {
    className: "left-0 -scale-x-100",
    direction: "prev",
  },
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof NavigationButton>

export const Default: Story = {}
