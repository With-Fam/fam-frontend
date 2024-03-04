import * as Yup from 'yup'

import { Duration } from '@/types'
import { addressValidationSchema, durationValidationSchema } from '@/utils/yup'

export interface TokenAllocation {
  allocationPercentage: number | string
  founderAddress: string
  endDate: string | number
  admin?: boolean
}

export interface VetoFromValues {
  vetoPower?: boolean
  vetoerAddress: string
}

export interface FounderFormValues {
  founderAllocation: TokenAllocation[]
}

export interface AuctionSettingsFormValues
  extends VetoFromValues,
    FounderFormValues {
  auctionDuration: Duration
  auctionReservePrice?: number
  // proposalThreshold?: number
  // quorumThreshold?: number
  // votingPeriod: Duration
  // votingDelay: Duration
}

const twentyFourWeeks = 60 * 60 * 24 * 7 * 24
const tenMinutes = 60 * 10

export const vetoValidationSchema = Yup.object({
  vetoPower: Yup.boolean().required(),
  vetoerAddress: Yup.string().optional(),
})

export const allocationSchema = Yup.object({
  founderAddress: addressValidationSchema,
  allocationPercentage: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('percentage is required')
    .integer('Must be whole number')
    .max(100, '< 100')
    .when('admin', (admin, schema) => {
      if (!admin) return schema.min(1, '> 0') // (condition, errorMessage) - allocation represented as % must be greater than or equal to 0
      return schema
    }),
  endDate: Yup.string()
    .required('date is required')
    .test(
      'isDateInFuture',
      'Must be in future',
      (value: string | undefined) => {
        if (!value) return false
        const date = new Date(value)
        const now = new Date()
        return date > now
      }
    ),
  admin: Yup.boolean(),
})

export const validationSchemaFounderAllocation = (
  signerAddress?: string | null
) =>
  Yup.object({
    founderAllocation: Yup.array()
      .of(allocationSchema)
      .min(1, 'founder is required')
      // .test(
      //   'founderAddress',
      //   'The founder must be the connected wallet.',
      //   function (value) {
      //     if (value?.[0]) {
      //       return value?.[0]['founderAddress'] === signerAddress
      //     }
      //     return false
      //   }
      // )
      .test(
        'founderAddress',
        'All founders allocation addresses should be unique.',
        function (values) {
          const addresses = values?.map((v) => v.founderAddress)
          return values?.length === new Set(addresses)?.size
        }
      ),
  })

export const auctionReservePriceValidationSchema = Yup.number()
  .transform((value) => (isNaN(value) ? undefined : value))
  .required('*')

export const auctionSettingsValidationSchema = (
  signerAddress?: string | null
): any =>
  Yup.object({
    // auctionDuration: durationValidationSchema(),
    auctionReservePrice: auctionReservePriceValidationSchema,
    // proposalThreshold: Yup.number()
    //   .transform((value) => (isNaN(value) ? undefined : value))
    //   .required('*')
    //   .min(0.01, '>= 0.01%')
    //   .max(10, '<= 10%'),
    // quorumThreshold: Yup.number()
    //   .transform((value) => (isNaN(value) ? undefined : value))
    //   .required('*')
    //   .test('greaterThanMin', '>= 2%', (value) => (value ? value >= 2 : false))
    //   .moreThan(
    //     Yup.ref('proposalThreshold'),
    //     'Quorum threshold must be greater than proposal threshold'
    //   )
    //   .max(20, '<= 20%'),
    // votingDelay: durationValidationSchema(
    //   { value: 1, description: '1 second' },
    //   { value: twentyFourWeeks, description: '24 weeks' }
    // ),
    // votingPeriod: durationValidationSchema(
    //   { value: tenMinutes, description: '10 minutes' },
    //   { value: twentyFourWeeks, description: '24 weeks' }
    // ),
  })
    .concat(vetoValidationSchema)
    .concat(validationSchemaFounderAllocation(signerAddress))
