'use client'

// Framework
import {
  useState,
  useEffect,
  useCallback,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import NextImage from 'next/image'

// Local Components
import ErrorMessage from '@/components/forms/ErrorMessage'

// Context
import { useFormContext } from 'react-hook-form'
import { Paragraph } from '@/stories'
import { Button } from '@/components/shared'
import { twMerge } from 'tailwind-merge'

// Type
interface MediaUploadProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  formId: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MediaUpload = ({ formId, ..._props }: MediaUploadProps): JSX.Element => {
  const { clearErrors, setError, setValue, getValues } = useFormContext()
  const sizeLimit = 340
  const [mediaFile, setMediaFile] = useState<string | null>(null)
  const [fileWidth, setFileWidth] = useState<number>(sizeLimit)
  const [fileHeight, setFileHeight] = useState<number>(sizeLimit)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const formImage = getValues(formId)
    formImage && setMediaFile(formImage)
  }, [formId])

  useEffect(() => {
    // show width and height of media file uploaded
  }, [mediaFile])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }

    const file = files[0]
    const urlImage = URL.createObjectURL(file)
    const img = new Image()
    img.src = urlImage

    img.onload = () => {
      const width = img.width
      const height = img.height
      setFileWidth(width)
      setFileHeight(height)
      setMediaFile(urlImage)
      setValue(formId, urlImage)
    }

    setMediaFile(urlImage)
    setValue(formId, urlImage)
  }

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setError!(formId, {
        type: 'required',
        message: 'Please, upload a valid media file.',
      })
      setImageError(true)
      setValue!(formId, '')
    }
  }, [imageError, setError, setValue, formId])

  const handleImageLoad = () => {
    clearErrors!(formId)
    setImageError(false)
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative z-0 flex h-[340px] w-[340px] items-center justify-center">
          <div className="z-0 flex h-full w-full flex-col items-center justify-center rounded-lg bg-grey-light">
            {!mediaFile && (
              <>
                <Button
                  type="button"
                  variant="primary"
                  className="pointer-events-none mb-2 px-3 py-2"
                  aria-label="disabled"
                >
                  <Paragraph as="p5">Upload media</Paragraph>
                </Button>
                <Paragraph as="p5" className="text-grey">
                  png, gif, jpeg or svg {fileWidth}x{fileHeight}
                </Paragraph>
              </>
            )}
          </div>
          <input
            {..._props}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="upload media"
            className="absolute left-0 top-0 z-30 h-full w-full cursor-pointer opacity-0"
          />
          {mediaFile && (
            <NextImage
              src={mediaFile}
              alt=""
              width={Math.min(fileWidth, sizeLimit)}
              height={Math.min(fileHeight, sizeLimit)}
              className={twMerge(
                'absolute z-20',
                fileWidth < sizeLimit || fileHeight < sizeLimit
                  ? `left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2
                  w-[${fileWidth}] h-[${fileHeight}]`
                  : 'left-0 top-0 h-full w-full object-cover'
              )}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
        </div>
      </div>
      <ErrorMessage name={formId} />
    </div>
  )
}

export default MediaUpload
