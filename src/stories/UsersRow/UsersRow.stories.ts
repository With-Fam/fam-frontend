import type { Meta, StoryObj } from '@storybook/react'

import UserRow from '.'

const meta: Meta<typeof UserRow> = {
  title: 'UserRow',
  component: UserRow,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: '+ 230 others',
    users: [
      '/assets/images/users/u1.jpeg',
      '/assets/images/users/u2.jpeg',
      '/assets/images/users/u3.jpeg',
      '/assets/images/users/u4.jpeg',
    ],
  },
}
