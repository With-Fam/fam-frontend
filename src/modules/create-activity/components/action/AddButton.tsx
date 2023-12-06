'use client'

// Framework
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// Third Parties
import { useFormContext } from 'react-hook-form'

// Local Components
import { Paragraph } from '@/stories'
import { Cross, ThreeDots, Trash, EditPen, Close } from '@/components/icons'

// Content
import ACTIONS_DATA from '@/content/create-activity/actions'
import POPULAR_ACTIONS_DATA from '@/content/create-activity/apps'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function AddButton(): JSX.Element {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const { unregister, setValue, getValues } = useFormContext()
  const params = useSearchParams()
  const router = useRouter()
  const activityId = params.get('id')
  const action = [...ACTIONS_DATA, ...POPULAR_ACTIONS_DATA].find(
    (actionItem) => activityId === actionItem.id
  )

  // This prevents that a reload will keep an action selected
  useEffect(() => {
    // before implementing all to handle all apps, this control is disabled
    console.log(getValues())
  }, [])

  // This populates the action selected
  useEffect(() => {
    setValue('id', activityId)
    const selectedImage = getValues('image')
    const selectedTitle = getValues('action-title')
    setImage(selectedImage)
    setTitle(selectedTitle)
  }, [activityId, getValues, setValue])

  // This resets data, but keeps the title and description
  const handleRemoveAction = () => {
    unregister('duration')
    unregister('goal')
    unregister('action-title')
    unregister('image')
    router.push('/create-activity')
    setOptionsOpen(false)
  }

  if (activityId && action) {
    return (
      <div className="absolute bottom-16 left-1/2 box-content w-full -translate-x-1/2 px-4 sm:w-[322px]">
        <div className="relative flex gap-4 rounded-2xl bg-white p-4">
          <button
            type="button"
            className="absolute right-2 top-1 z-10 cursor-pointer p-2"
            onClick={() => setOptionsOpen(!optionsOpen)}
          >
            <ThreeDots />
          </button>
          {optionsOpen && (
            <div className="absolute -top-32 right-0 z-20 flex flex-col items-start gap-2 rounded-md bg-white py-4 pl-4 pr-6 text-left shadow-card">
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={handleRemoveAction}
              >
                <Trash className="h-5" />
                <span className="pt-1 text-grey">Remove</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => {
                  router.push(action.href)
                }}
              >
                <EditPen className="h-4" />
                <span className="pt-1 text-grey">Edit</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={() => setOptionsOpen(false)}
              >
                <Close className="relative top-0.5 h-5" />
                <span className="pt-1 text-grey">Cancel</span>
              </button>
            </div>
          )}
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-grey-light">
            {image && (
              <Image
                src={image}
                fill
                className="rounded-md object-cover"
                alt={action.title}
              />
            )}
          </div>
          <div className="text-left">
            <Paragraph as="p3" className="mb-2">
              {action.title}
            </Paragraph>
            {title && (
              <Paragraph as="p5" className="text-grey">
                {title}
              </Paragraph>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      className="absolute bottom-16 left-1/2 box-content w-full -translate-x-1/2 cursor-pointer px-4 sm:w-[322px]"
      passHref
      href="/create-activity/pick-action"
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
    </Link>
  )
}
