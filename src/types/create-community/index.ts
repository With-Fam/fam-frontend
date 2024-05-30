import { Dispatch, SetStateAction } from 'react'

import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form'

export type MembershipTypes = 'daily' | 'fixed'

export type PhasesProps =
  | 'start'
  | 'profile'
  | 'membership'
  | 'auctions'
  | 'artwork'
  | 'confirm-one'
  | 'confirm-two'
  | 'creating'
  | 'success'

export interface CommunityInputs {
  type: string
  communityName: string
  description: string
  symbol: string
  website: string
  profileImage: string
  membership: MembershipTypes
  price: string
  address: string
  percentage: string
  endDate: string
  veto: boolean
  vetoAddress: string
}

export type ValidadedFieldsProps =
  | 'membership'
  | 'communityName'
  | 'description'
  | 'symbol'
  | 'website'
  | 'profileImage'
  | 'price'
  | 'address'
  | 'percentage'
  | 'endDate'
  | 'vetoAddress'

export interface FormActionsProps {
  formActions: {
    register: UseFormRegister<CommunityInputs> | null
    errors: FieldErrors<CommunityInputs> | null
    setError: UseFormSetError<CommunityInputs> | null
    clearErrors: UseFormClearErrors<CommunityInputs> | null
    getValues: UseFormGetValues<CommunityInputs> | null
    setValue: UseFormSetValue<CommunityInputs> | null
    setPhasePosition: Dispatch<SetStateAction<number>>
  }
}

export type CommunityInputsKeys = keyof CommunityInputs

export type IconProps = 'pink_circle' | 'purple_dots' | 'yellow_poly'

export interface ActionsDataProps {
  id: string
  date: string
  title: string
  votes: number
  status: null | 'passed' | 'rejected'
  description: string
  users: string[]
  creator: {
    image: string
    name: string
  }
  comments: string[]
}
