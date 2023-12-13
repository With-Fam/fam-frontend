import { ReactElement } from 'react'
import { AddressType } from '@/types'

/** temporarily declaring this here to get started working with some of the forms */
export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
}

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
