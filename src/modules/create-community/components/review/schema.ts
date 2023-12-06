import { Schema, z } from 'zod'

export interface ReviewFormValues {
  approved: boolean
}

const schema: Schema<ReviewFormValues> = z.object({
  approved: z.boolean(),
})

export default schema
