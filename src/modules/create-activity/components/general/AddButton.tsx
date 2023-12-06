'use client'

// Framework
import Image from 'next/image'
import { useMemo } from 'react'
import { Popover } from '@headlessui/react'

// Local Components
import { Paragraph } from '@/stories'
import { Cross, ThreeDots } from '@/components/icons'
import ACTIONS_DATA from '@/content/create-activity/actions'
import { ActionItemProps } from '@/types/create-activity'
import { Maybe } from '@/types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type Props = {
  activityType?: string
}

export function AddButton({ activityType }: Props): JSX.Element {
  const action = useMemo((): Maybe<ActionItemProps> => {
    if (!activityType) return null
    const current = ACTIONS_DATA.find(({ id }) => id === activityType)
    return current ?? null
  }, [activityType])

  if (activityType && action) {
    return (
      <div
        className="mb-24 box-content w-auto self-center px-4
        sm:w-[322px]"
      >
        <div className="relative flex gap-4 rounded-2xl bg-white p-4">
          <div className="absolute right-10 top-1 z-10 w-auto">
            <Popover className="relative w-auto">
              <Popover.Button className="absolute cursor-pointer p-2">
                <ThreeDots />
              </Popover.Button>

              <Popover.Panel className="absolute left-8 z-10 h-auto rounded-md bg-white p-4 shadow-md">
                Let&apos;s have a think about using this popover
              </Popover.Panel>
            </Popover>
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
              {action.description}
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
