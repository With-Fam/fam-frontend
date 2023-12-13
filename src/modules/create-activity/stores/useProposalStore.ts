import { create } from 'zustand'

import { AddressType } from '@/types'

import { TransactionType } from '../types'

export type Transaction = {
  functionSignature: string
  target: AddressType
  value: string
  calldata: string
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
}

interface Actions {
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
}

export const useProposalStore = create<State & Actions>((set) => ({
  ...initialState,
  addTransaction: (transaction: BuilderTransaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }))
  },
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
