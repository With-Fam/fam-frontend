import { ZodSchema, z } from 'zod'

export type ConfirmFormValues = {
  confirm: boolean
}

const schema: ZodSchema<ConfirmFormValues> = z.object({
  confirm: z.boolean({
    required_error: 'please confirm your config',
  }),
})

export default schema
