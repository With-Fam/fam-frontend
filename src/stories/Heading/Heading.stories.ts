import type { Meta, StoryObj } from '@storybook/react'

import Heading from '.'

const meta: Meta<typeof Heading> = {
  title: 'Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children: 'This is a heading',
  },
  argTypes: {
    as: {
      description: 'h1: 80px, h2: 64px, h3: 40px, h4: 32px, h5: 24px',
    },
  },
  parameters: {
    tags: ['autodocs'],
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const HeadingOne: Story = {
  args: {
    as: 'h1',
    children: 'This is a h1 header',
  },
}

export const HeadingTwo: Story = {
  args: {
    as: 'h2',
    children: 'This is a h2 header',
  },
}

export const HeadingThree: Story = {
  args: {
    as: 'h3',
    children: 'This is a h3 header',
  },
}

export const HeadingFour: Story = {
  args: {
    as: 'h4',
    children: 'This is a h4 header',
  },
}

export const HeadingFive: Story = {
  args: {
    as: 'h5',
    children: 'This is a h5 header',
  },
}
