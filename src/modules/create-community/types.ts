import { ReactElement } from 'react'

// We're going to clone the nouns-builder format
export interface CreateSection {
  action?: React.ReactElement
  order: number
  title: string
  key: string
  heading?: string
  subHeading?: string
  content: ReactElement
}
