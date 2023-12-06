import { nonEmptyString } from '@/utils/zod'
import { z, ZodSchema } from 'zod'

export type CrowdfundValues = {
  title: string
  goal: number
  duration: number
  hosts: string[]
}

const schema: ZodSchema<CrowdfundValues> = z.object({
  title: nonEmptyString,
  goal: z.coerce.number().min(0.001),
  duration: z.coerce.number(),
  hosts: z.array(nonEmptyString).min(1),
})

export default schema
