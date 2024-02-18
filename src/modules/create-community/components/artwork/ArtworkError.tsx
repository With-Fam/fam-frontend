'use client'

import { Dispatch, SetStateAction } from 'react'
import { ArtworkUploadError } from '@/hooks'

type ArtworkErrorProps = {
  setUploadArtworkError: Dispatch<
    SetStateAction<ArtworkUploadError | undefined>
  >
  uploadArtworkError?: ArtworkUploadError
}

export function ArtworkError({
  setUploadArtworkError,
  uploadArtworkError,
}: ArtworkErrorProps): JSX.Element {
  const errorCategories = Object.keys(
    uploadArtworkError || {}
  ) as (keyof ArtworkUploadError)[]
  const hasError = errorCategories.length > 0

  return (
    <div className="relative col-span-2 flex aspect-video h-auto w-full flex-col items-center justify-center overflow-clip rounded-lg bg-grey-light py-6">
      <p className="mb-2 text-xl text-status-red">Upload Error</p>
      {hasError &&
        errorCategories.map((category) => (
          <p key={category} className="mx-auto max-w-md text-center">
            <span className="font-bold capitalize">{category}: </span>
            <span>{uploadArtworkError && uploadArtworkError[category]}</span>
          </p>
        ))}
      <button
        onClick={() => setUploadArtworkError(undefined)}
        className="mt-4 rounded-full bg-black px-6 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  )
}
