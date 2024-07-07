export type ActivityFormValues = {
  title: string
  description: string
  'action-title': string
  goal: string
  duration: number
  id: string
  image: string
  'funds-amount'?: string
  'funds-recipient'?: string
  currency?: string
}

export type ActionItemProps = {
  image: string
  mobile_image: string
  imageAlt?: string
  title: string
  description: string
  id: string
}
