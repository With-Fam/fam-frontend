import type { Meta, StoryObj } from '@storybook/react'

import Placeholder from '.'

const meta: Meta<typeof Placeholder> = {
  title: 'Shared/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
