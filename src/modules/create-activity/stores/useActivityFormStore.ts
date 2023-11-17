'use client'
import { DaoContractAddresses } from '@/modules/create-community'

type UseActivityFormStoreProps = Record<string, unknown>
type UseActivityFormStoreResult = Record<string, unknown>

export function useActivityFormStore(
  _props: UseActivityFormStoreProps
): UseActivityFormStoreResult {
  console.log('useActivityFormStore::', _props)
  return {}
}

type GeneralActivityValues = {
  activityName: string
  activityDescription: string
  activityAction: string
}

type FundraisingTargetValues = {
  ammount: number
  // number or date?
  votingPeriod: number
  hosts: string[]
}

export interface ActivityFormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralActivityValues
  setGeneral: (general: GeneralActivityValues) => void
  fundraising: FundraisingTargetValues
  setFundraising: (fundraising: FundraisingTargetValues) => void
  deployedDao: DaoContractAddresses
  setDeployedDao: (deployedDao: DaoContractAddresses) => void
  resetForm: () => void
}
