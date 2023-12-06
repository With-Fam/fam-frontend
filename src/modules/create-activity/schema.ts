import { ActivityFormValues } from '@/types/create-activity'
import { ZodSchema, z } from 'zod'

const nonEmptyString = z
  .string()
  .trim()
  .min(1, { message: 'string is required' })

const schema: ZodSchema<ActivityFormValues> = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  'action-title': nonEmptyString,
  goal: nonEmptyString,
  duration: z.number().min(1).max(30).positive().int(),
  id: nonEmptyString,
  image: nonEmptyString,
})

export default schema
