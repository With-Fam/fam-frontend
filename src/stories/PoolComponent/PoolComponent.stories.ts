import type { Meta, StoryObj } from '@storybook/react'

import PoolComponent from '.'

const meta: Meta<typeof PoolComponent> = {
  title: 'PoolComponent',
  component: PoolComponent,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof PoolComponent>

export const Default: Story = {}
