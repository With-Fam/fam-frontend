import { Fragment, PropsWithChildren } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ThreeDots } from '@/components/icons'

import { Edit } from './Edit'
import { Trash } from './Trash'
import { twMerge } from 'tailwind-merge'
import { Paragraph } from '@/stories'

type ActionsPanelProps = {
  onEdit: () => void
  onDelete: () => void
}

type Props = PropsWithChildren<{
  onClick: () => void
}>

function ActionsPanelItem({ onClick, children }: Props): JSX.Element {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={twMerge(
            'group flex h-12 w-full flex-row items-center justify-start space-x-2 rounded-md p-3 text-sm text-grey-dark',
            active && 'bg-grey-light'
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  )
}

export function ActionsPanel({
  onDelete,
  onEdit,
}: ActionsPanelProps): JSX.Element {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="hover:bg-gray/30 inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ThreeDots />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <ActionsPanelItem onClick={onEdit}>
              <Edit />
              <Paragraph as="p5" className="leading-none">
                Edit
              </Paragraph>
            </ActionsPanelItem>
            <ActionsPanelItem onClick={onDelete}>
              <Trash />
              <Paragraph as="p5" className="leading-none">
                Delete
              </Paragraph>
            </ActionsPanelItem>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
