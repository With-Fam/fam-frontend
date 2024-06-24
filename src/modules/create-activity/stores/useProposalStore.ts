import { create } from 'zustand'

import { TransactionType } from '../types'
import { Address } from 'viem'

export enum EDITON_SIZE {
  OPEN,
  ONEOFONE,
  FIXED,
}

export enum LIMIT {
  UNLIMITED,
  CUSTOM,
}

export type Transaction = {
  functionSignature: string
  target: Address
  value: string
  calldata: string
  collectionImage?: string
  title?: string
  description?: string
  pricePerEdition?: number
  duration?: number
  payoutAddress?: Address
  customLimit?: number
  customEditionSize?: number
}

export type BuilderTransaction = {
  type: TransactionType
  transactions: Transaction[]
  summary?: string
}

interface State {
  transactions: BuilderTransaction[]
  disabled: boolean
  title?: string
  summary?: string
  showAdvancedOfZoraCreate: boolean
  editionSize: number
  limitPerAddress: number
}

interface Actions {
  setShowAdvancedOfZoraCreate: (showAdvanced: boolean) => void
  setEditionSize: (editionSize: number) => void
  setLimitPerAddress: (limitPerAddress: number) => void
  addTransaction: (builderTransaction: BuilderTransaction) => void
  addTransactions: (builderTransactions: BuilderTransaction[]) => void
  editTransaction: (
    index: number,
    builderTransaction: BuilderTransaction
  ) => void
  removeTransaction: (index: number) => void
  removeAllTransactions: () => void
  createProposal: ({
    title,
    summary,
    disabled,
    transactions,
  }: Pick<State, 'title' | 'summary' | 'transactions' | 'disabled'>) => void
  clearProposal: () => void
}

const initialState: State = {
  summary: undefined,
  title: undefined,
  disabled: false,
  transactions: [],
  showAdvancedOfZoraCreate: false,
  editionSize: EDITON_SIZE.OPEN,
  limitPerAddress: LIMIT.UNLIMITED,
}

export const useProposalStore = create<State & Actions>((set) => ({
  ...initialState,
  addTransaction: (transaction: BuilderTransaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }))
  },
  setEditionSize: (editionSize: number) => set({ editionSize }),
  setLimitPerAddress: (limitPerAddress: number) => set({ limitPerAddress }),
  setShowAdvancedOfZoraCreate: (showAdvancedOfZoraCreate: boolean) =>
    set({ showAdvancedOfZoraCreate }),
  addTransactions: (transaction: BuilderTransaction[]) => {
    set((state) => ({
      transactions: [...state.transactions, ...transaction],
    }))
  },
  editTransaction: (indexOf: number, transaction: BuilderTransaction) => {
    set((state) => {
      const nextTransactions = [...state.transactions]
      nextTransactions[indexOf] = transaction
      return {
        transactions: nextTransactions,
      }
    })
  },
  removeTransaction: (index) => {
    set((state) => ({
      transactions: state.transactions.filter((_, i) => i !== index),
    }))
  },
  removeAllTransactions: () => {
    set(() => ({ transactions: [] }))
  },
  createProposal: ({ title, summary, disabled, transactions }) =>
    set({ title, summary, disabled, transactions }),
  clearProposal: () => set(() => ({ ...initialState })),
}))
