import { ActivityFormStoreState } from '@/modules/create-activity/stores'
import { ActionItemProps } from '@/types/create-activity'

import { default as ACTIONS } from '@/content/create-activity/actions'
import { TransactionType } from '@/modules/create-activity/types'

import { ActionCard } from './ActionCard'

interface ActionSectionProps {
  onClick: ActivityFormStoreState['setActivityType']
  actions?: Array<ActionItemProps>
}

export function ActionSection({ onClick }: ActionSectionProps): JSX.Element {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {ACTIONS.map((_action) => (
          <ActionCard
            key={_action.id}
            {..._action}
            onClick={() => onClick(_action.id as TransactionType)}
          />
        ))}
      </div>
    </div>
  )
}
