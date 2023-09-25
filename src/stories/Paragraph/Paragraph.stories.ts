import type { Meta, StoryObj } from '@storybook/react'

import Paragraph from '.'

const meta: Meta<typeof Paragraph> = {
  title: 'Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  args: {
    children: 'This is a paragraph',
  },
  parameters: {
    tags: ['autodocs'],
  },
  argTypes: {
    as: {
      options: ['p1', 'p2', 'p3', 'p4', 'p5'],
      description: 'p1: 32px, p2: 24px, p3: 18px, p4: 16px, p5: 14px',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ParagraphOne: Story = {
  args: {
    as: 'p1',
    children: 'This is a p1 paragraph',
  },
}

export const ParagraphTwo: Story = {
  args: {
    as: 'p2',
    children: 'This is a p2 paragraph',
  },
}

export const ParagraphThree: Story = {
  args: {
    as: 'p3',
    children: 'This is a p3 paragraph',
  },
}

export const ParagraphFour: Story = {
  args: {
    as: 'p4',
    children: 'This is a p4 paragraph',
  },
}

export const ParagraphFive: Story = {
  args: {
    as: 'p5',
    children: 'This is a p5 paragraph',
  },
}
