import * as Yup from 'yup'

import { urlValidationSchema } from '@/lib/yup'

export interface GeneralFormValues {
  daoAvatar?: string
  daoName: string
  projectDescription?: string
  daoSymbol: string
  daoWebsite?: string
}

export const generalValidationSchema: Yup.ObjectSchema<GeneralFormValues> =
  Yup.object({
    daoAvatar: Yup.string().optional(),
    daoName: Yup.string().required('*').max(255),
    // Check max limit
    projectDescription: Yup.string()
      .required('*')
      .max(5000, '< 5000 characters'),
    daoSymbol: Yup.string()
      .max(24, '<= 24 characters')
      .matches(/^[$]*[a-zA-Z0-9_-]*$/i)
      .required('*'),
    daoWebsite: urlValidationSchema,
  })
