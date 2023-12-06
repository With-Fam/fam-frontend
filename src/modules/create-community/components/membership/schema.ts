import { FormValues } from './MembershipForm'
import { ZodSchema, z } from 'zod'

const schema: ZodSchema<FormValues> = z.object({
  type: z.enum(['daily', 'fixed']),
})

export default schema
