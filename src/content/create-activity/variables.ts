type Phase = {
  order: number
  phase: PhaseKeys
  title: string
}

export type PhaseKeys = 'start' | 'pick-action' | 'actions' | 'apps' | 'add'

export const phases: Phase[] = [
  {
    order: 0,
    phase: 'start',
    title: 'New activity',
  },
  { order: 1, phase: 'pick-action', title: '' },
  { order: 2, phase: 'actions', title: '' },
  { order: 3, phase: 'apps', title: '' },
  { order: 4, phase: 'add', title: '' },
]
