import { debounce } from 'lodash'
import * as Yup from 'yup'

import { isAddress } from 'viem'

const validateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>,
  res: (value: boolean | Yup.ValidationError) => void
) => {
  try {
    if (!value) return res(false)
    const isValid = isAddress(value)

    if (!isValid) {
      return res(
        ctx.createError({ message: 'invalid address', path: ctx.path })
      )
    }
    res(isValid)
  } catch (err) {
    res(false)
  }
}

const deboucedValidateAddress = async (
  value: string | undefined,
  ctx: Yup.TestContext<any>
) => {
  const debouncedFn = debounce(validateAddress, 500)
  return await new Promise<boolean | Yup.ValidationError>((res) =>
    debouncedFn(value, ctx, res)
  )
}

export const addressValidationSchema = Yup.string()
  .required('not a valid address')
  .test(deboucedValidateAddress)

export const addressValidationOptionalSchema = Yup.string()
  .optional()
  .test(deboucedValidateAddress)
