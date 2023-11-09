import type { Meta, StoryObj } from '@storybook/react'

import Toggle from '.'

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    tags: ['autodocs'],
    docs: {
      description: {
        component:
          '<p>At times, the toggle will need to accommodate dynamic routes for each button. The <b>dynamicReference</b> will correspond to the dynamic variable name used in a Next.js route. The final <b>href</b> for that page will consider the current value of user.</p><p>Example:</p><p>A the Toggle component could have <b>dynamicReference</b> equal to <b>user</b>.<br />The dynamic route woulb be like so: <i>/user-profile/[user]?type=communities</i><br />A link in one of the Toggle buttons would become: <i>/user-profile/agcook.eth?type=communities</i>.</p>',
      },
    },
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
