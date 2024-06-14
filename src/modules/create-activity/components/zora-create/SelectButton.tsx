import { Paragraph } from '@/stories'
import React from 'react'

const SelectButton = ({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean
  onClick: () => void
  label: string
}) => {
  return (
    <button
      className={`text-abcMedium flex h-[100px] items-center justify-center rounded-2xl border ${isActive ? 'border-orange' : ''}`}
      type="button"
      onClick={onClick}
    >
      <Paragraph as="p3">{label}</Paragraph>
    </button>
  )
}

export default SelectButton
