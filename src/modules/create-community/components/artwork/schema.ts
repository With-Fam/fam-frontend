import { z } from 'zod'
import { nonEmptyString } from '@/lib/zod'

export interface ArtworkType {
  trait: string
  properties: string[]
}

export interface ArtworkFormValues {
  projectDescription: string
  artwork: Array<ArtworkType>
  filesLength?: number
  externalUrl?: string
  collectionName?: string
}

const schema = z.object({
  artwork: z
    .array(
      z.object({ trait: nonEmptyString, properties: z.array(nonEmptyString) })
    )
    .min(1),
})

export default schema
