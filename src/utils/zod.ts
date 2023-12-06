import { z } from 'zod'

export const nonEmptyString = z.coerce
  .string()
  .trim()
  .min(1, { message: 'string is required' })

export const numberCoerce = z.coerce.number()
