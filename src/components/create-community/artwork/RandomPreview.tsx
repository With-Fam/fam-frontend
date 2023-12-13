'use client'
import { PropsWithChildren } from 'react'

// Hooks
import {
  useArtworkPreview,
  type ImageProps,
  SelectedTraitsProps,
} from '@/hooks'

// Types
import type { Maybe } from '@/types'
import { FormStoreState } from '@/modules/create-community'
import { Icon } from '@/components/Icon'
import { twMerge } from 'tailwind-merge'

/**
 * Components
 */

export type RandomPreviewProps = PropsWithChildren<{
  isEmpty?: boolean
  images?: ImageProps[]
  orderedLayers: FormStoreState['orderedLayers']
}>

export function RandomPreview({
  children,
  images,
  isEmpty = true,
  orderedLayers,
}: RandomPreviewProps): Maybe<JSX.Element> {
  const { selectedTraits, randomise } = useArtworkPreview({
    images,
    orderedLayers,
  })
  const organisedTraits = [...(selectedTraits ?? [])].reverse()
  return (
    <div
      className={twMerge('space-y-4', isEmpty ? 'col-span-2' : 'col-span-1')}
    >
      <div
        className={twMerge(
          'relative flex h-auto w-full items-center justify-center overflow-clip rounded-lg bg-grey-light',
          isEmpty ? 'aspect-video' : 'aspect-square'
        )}
      >
        {children}
        {organisedTraits?.map((_i: SelectedTraitsProps, _idx: number) => (
          <img
            className={twMerge('absolute top-0 h-full w-full', `z-[1${_idx}]`)}
            key={`layer ${_idx}`}
            alt={_i.trait}
            height="100%"
            width="100%"
            src={_i.url}
          />
        ))}
      </div>
      {!isEmpty && (
        <button
          className="flex flex-row items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          type="button"
          onClick={randomise}
        >
          <Icon id="refresh" className="mr-2 h-6 w-6" />
          <span className="text-sm text-black">Randomise preview</span>
        </button>
      )}
    </div>
  )
}
