import { nonEmptyString } from '@/utils/zod'
import { z, ZodSchema } from 'zod'

export type GeneralActivityValues = {
  activityName: string
  activityDescription: string
}

const schema: ZodSchema<GeneralActivityValues> = z.object({
  activityName: nonEmptyString,
  activityDescription: nonEmptyString,
})
export default schema
