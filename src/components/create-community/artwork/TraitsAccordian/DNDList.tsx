import { createElement, PropsWithChildren, useState } from 'react'

//Dnd Items
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import type { TraitProps } from './Trait'

type DndFieldContextProps = PropsWithChildren<{
  id?: string
  items: TraitProps[]
  ListItem: (a: TraitProps) => JSX.Element
  onChange: (a: TraitProps[]) => void
}>

export function DNDList({
  children,
  id,
  items: unorderedItems = [],
  ListItem,
  onChange,
}: DndFieldContextProps): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const items = unorderedItems.map((i) => ({ ...i, id: i.trait }))

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay>
        {activeId
          ? createElement(ListItem, {
              ...items.find((i) => i.id === activeId),
            } as TraitProps)
          : null}
      </DragOverlay>
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    setActiveId(`${active.id}`)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id)
      const newIndex = items.findIndex((j) => j.id === over?.id)
      const next = arrayMove(items, oldIndex, newIndex)
      onChange(next as TraitProps[])
    }

    setActiveId(null)
  }
}
