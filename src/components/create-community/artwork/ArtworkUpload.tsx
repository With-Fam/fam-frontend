import { BaseSyntheticEvent, useEffect, useRef } from 'react'

// Hooks
import { type ArtworkUploadError } from '@/hooks'

// Styles
import { defaultUploadStyle } from '@/components/forms/styles.css'

// Components
import { Paragraph } from '@/stories'

import { TraitsAccordian, type TraitsAccordianProps } from './TraitsAccordian'
import { RandomPreview, type RandomPreviewProps } from './RandomPreview'
import { UploadLabel } from './UploadLabel'

const nonEmptyArray = (a?: Array<unknown>): boolean =>
  Array.isArray(a) && a.length > 0

type ArtworkUploadProps = {
  helperText: string
  fileCount?: number
  traitCount: number
  onUpload: (e: BaseSyntheticEvent) => void
  uploadArtworkError?: ArtworkUploadError
  ipfsUploadError: boolean
  fileType?: string
} & TraitsAccordianProps &
  RandomPreviewProps

export const ArtworkUpload = ({
  artwork,
  helperText,
  // fileCount,
  // traitCount,
  onUpload,
  orderedLayers,
  setOrderedLayers,
  // uploadArtworkError,
  images, // ipfsUploadError,
}: ArtworkUploadProps): JSX.Element => {
  const dropInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (dropInput.current !== null) {
      dropInput.current.setAttribute('directory', '')
      dropInput.current.setAttribute('webkitdirectory', '')
    }
  }, [dropInput])

  const hideDropBox = nonEmptyArray(images) && nonEmptyArray(artwork)

  return (
    <div className="w-full space-y-4">
      <div className="space-y-4 text-left">
        <Paragraph as="p4" className="text-justify text-grey-dark">
          {helperText}
        </Paragraph>
        <Paragraph as="p4" className="text-grey-dark">
          To learn more about setting up your layers go{' '}
          <a
            className="underline"
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://docs.zora.co/docs/smart-contracts/nouns-builder/img-config"
          >
            here.
          </a>
        </Paragraph>
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {hideDropBox && (
            <TraitsAccordian
              artwork={artwork}
              orderedLayers={orderedLayers}
              setOrderedLayers={setOrderedLayers}
            />
          )}
          <RandomPreview
            isEmpty={!hideDropBox}
            images={images}
            orderedLayers={orderedLayers}
          >
            <UploadLabel htmlFor="file-upload" isEmpty={!hideDropBox} />
          </RandomPreview>
          <input
            className={defaultUploadStyle}
            id="file-upload"
            name="file"
            type="file"
            multiple={true}
            ref={dropInput}
            onChange={onUpload}
          />
        </div>
      </div>
    </div>
  )
}
