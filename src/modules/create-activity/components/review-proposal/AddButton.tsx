'use client'

// Framework
import Image from 'next/image'
import { useMemo } from 'react'

// Local Components
import { Paragraph } from '@/stories'
import { Cross } from '@/components/icons'
import { Maybe } from '@/types'
import {
  TRANSACTION_TYPES,
  TransactionType,
} from '@/modules/create-activity/types'

import { ActionsPanel } from './ActionsPanel'
import { useParams } from 'next/navigation'
import {
  useActivityFormStore,
  useProposalStore,
} from '@/modules/create-activity/stores'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function AddButton(): JSX.Element {
  const { communityId } = useParams()
  const { removeAllTransactions } = useProposalStore()
  const { activityType, setActivityType, setActiveSection } =
    useActivityFormStore()

  const action = useMemo((): Maybe<
    (typeof TRANSACTION_TYPES)[TransactionType]
  > => {
    if (!activityType) return null
    return TRANSACTION_TYPES[activityType]
  }, [activityType])

  console.log('action::', action)

  if (activityType && action) {
    return (
      <div
        className="mb-24 box-content w-auto self-center px-4
        sm:w-[322px]"
      >
        <div className="relative flex gap-4 rounded-2xl bg-white p-4">
          <div className="absolute right-1 top-1 z-10 w-auto">
            <ActionsPanel
              onEdit={() => setActiveSection(2)}
              onDelete={() => {
                setActivityType(null)
                removeAllTransactions()
              }}
            />
          </div>
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-clip rounded-md bg-grey-light">
            <Image
              src={action.image}
              fill
              sizes="120px"
              className="object-cover"
              alt={action.title}
            />
          </div>
          <div className="text-left">
            <Paragraph as="p3" className="mb-2">
              {action.title}
            </Paragraph>
            <Paragraph as="p5" className="text-grey">
              {action.subTitle}
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      type="submit"
      className="mb-24 box-content w-auto cursor-pointer self-center px-4 sm:w-[322px]"
    >
      <div className="flex gap-4 rounded-2xl bg-white p-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-grey-light">
          <Cross color="#A7A7A7" className="h-8 w-8" />
        </div>
        <div className="text-left">
          <Paragraph as="p3" className="mb-2">
            Add an action
          </Paragraph>
          <Paragraph as="p5" className="text-grey">
            Create an NFT, send funds, connect to web3 apps and more
          </Paragraph>
        </div>
      </div>
    </button>
  )
}
