'use client'

// Framework
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'

// Components
import { Button } from '@/components/shared/Button'
import { twMerge } from 'tailwind-merge'
import Paragraph from '@/stories/Paragraph'
import { Close } from '@/components/icons'

// Helpers
import useUserHitEscape from '@/hooks/useUserHitEscape'

// Types
type VetoConfirmModalProps = {
  setOpenConfirm: Dispatch<SetStateAction<boolean>>
  setIsConfirmed: Dispatch<SetStateAction<boolean>>
  buttonClassName?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VetoConfirmModal = ({
  setOpenConfirm,
  setIsConfirmed,
  buttonClassName,
}: VetoConfirmModalProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  useUserHitEscape(() => setOpenConfirm(false))

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    const inputValue = e.currentTarget.form?.['veto-confirm']?.value
    if (inputValue === 'VETO') {
      setIsConfirmed(true)
    } else {
      setError('Please type "VETO" in uppercase to confirm')
    }
  }

  return createPortal(
    <div
      className="fixed z-30 flex h-screen w-screen flex-col items-center justify-center px-4"
      aria-modal="true"
    >
      <div
        className="absolute z-0 h-full w-full bg-black/30"
        onClick={() => setOpenConfirm(false)}
      />
      <div className="relative z-10 rounded-lg border border-solid border-grey-light bg-white p-8 text-center">
        <button
          type="button"
          className="absolute right-2 top-2"
          onClick={() => setOpenConfirm(false)}
        >
          <Close className="h-5 w-5" />
        </button>
        <Paragraph as="p3" className="mb-1">
          Are you absolutely sure?
        </Paragraph>
        <Paragraph as="p5" className="text-grey">
          This action is not reversible. Please type &apos;VETO&apos; to
          confirm.
        </Paragraph>
        <form action="">
          <input
            name="veto-confirm"
            type="text"
            placeholder=""
            className="mx-auto my-8 block w-full max-w-xs rounded-2xl bg-grey-light px-4 py-2 text-lg outline-0"
          />
          {error && (
            <Paragraph as="p5" className="mb-4 text-status-red">
              {error}
            </Paragraph>
          )}
          <Button
            type="button"
            className={twMerge('mx-auto h-8 w-max px-4 py-2', buttonClassName)}
            onClick={(e) => handleClick(e)}
          >
            <Paragraph as="p5" className="text-white">
              Confirm and Veto
            </Paragraph>
          </Button>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default VetoConfirmModal
