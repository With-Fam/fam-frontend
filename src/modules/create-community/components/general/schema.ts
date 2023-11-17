import { GeneralFormValues } from './GeneralForm'
import { ZodSchema, z } from 'zod'

import { nonEmptyString } from '@/utils/zod'

const schema: ZodSchema<GeneralFormValues> = z.object({
  daoName: nonEmptyString,
  daoDescription: nonEmptyString,
  daoSymbol: nonEmptyString,
  daoWebsite: nonEmptyString.url(),
  daoAvatar: nonEmptyString,
})

export default schema
