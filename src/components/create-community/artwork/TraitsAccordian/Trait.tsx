// Utils
import { CSS } from '@dnd-kit/utilities'

// Hooks
import { useSortable } from '@dnd-kit/sortable'

// Components

import { Icon } from '@/components/Icon'
import Paragraph from '@/stories/Paragraph'
import { twMerge } from 'tailwind-merge'

interface Trait {
  trait: string
  properties: string[]
  ipfs?: Record<string, unknown>[]
}

export type OrderedTraits = Array<Trait>

export type TraitProps = Trait & {
  dragging?: boolean
  id: string
  index: number
}

function getLayer(idx: number) {
  switch (idx) {
    case 0:
      return 'Top Layer'
    case 1:
    case 2:
    case 3:
      return `Layer #${idx}`
    case 4:
      return 'Base Layer'
    default:
      return 'Out of Range'
  }
}

export function Trait({ index, trait }: TraitProps): JSX.Element {
  const {
    active,
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: trait })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        'flex flex-row items-center justify-between rounded-md bg-white p-4 shadow-sm',
        active ? 'bg-grey-light' : 'bg-white'
      )}
      style={style}
    >
      <Paragraph as="p3" className="text-xl">
        {trait}
      </Paragraph>
      <div className="flex flex-row items-center justify-end space-x-1">
        <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-500">
          {getLayer(index)}
        </span>
        <button
          {...listeners}
          {...attributes}
          type="button"
          className="cursor-move"
          ref={setActivatorNodeRef}
        >
          <Icon id="move" className="fill-black" />
        </button>
      </div>
    </div>
  )
}
