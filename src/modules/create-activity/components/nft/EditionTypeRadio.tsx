import { RadioGroup } from '@headlessui/react'

import { EditionType } from './CreateNFT.schema'
import { twMerge } from 'tailwind-merge'

type RadioGroupOptionProps = {
  name: string
  value: EditionType
}

function RadioGroupOption({ name, value }: RadioGroupOptionProps): JSX.Element {
  return (
    <RadioGroup.Option
      key={value}
      value={value}
      className={({ active, checked }) =>
        twMerge(
          active ? 'ring-offset ring ring-grey-light' : '',
          checked ? 'bg-grey-light text-white' : 'hover:bg-gray-50',
          'shrink cursor-pointer items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-black hover:ring-2 hover:ring-grey-dark hover:ring-offset-2'
        )
      }
    >
      <RadioGroup.Label as="span">{name}</RadioGroup.Label>
    </RadioGroup.Option>
  )
}

type Props = {
  editionType: EditionType
  onChange: (a: EditionType) => void
}

export function EditionTypeRadio({
  editionType,
  onChange,
}: Props): JSX.Element {
  return (
    <RadioGroup
      value={editionType}
      onChange={onChange}
      className="col-span-2 mx-auto mt-2 flex shrink space-x-2"
    >
      <RadioGroupOption name="Limited Edition" value="fixed" />
      <RadioGroupOption name="Open Edition" value="open" />
    </RadioGroup>
  )
}
