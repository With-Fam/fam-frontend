import { ZodSchema, z } from 'zod'

export type ConfirmFormValues = {
  confirm: boolean
}

const schema: ZodSchema<ConfirmFormValues> = z.object({
  confirm: z.boolean({
    required_error: 'please confirm your config',
  }),
  // termsAcceptance: z.boolean().refine((value) => value === true, {
  //   message: 'please confirm terms of service',
  // }),
  deployDaoAcceptance: z.boolean().refine((value) => value === true, {
    message: 'please confirm DAO deploy',
  }),
})

export default schema
