'use client'

// Framework
import {
  useState,
  useEffect,
  useCallback,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import Image from 'next/image'

// Local Components
import { Camera } from '@/components/icons'
import ErrorMessage from '@/components/forms/ErrorMessage'

// Context
import { useFormContext } from 'react-hook-form'

// Type
interface ImageUploadProps
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

const ImageUpload = ({ formId, ..._props }: ImageUploadProps): JSX.Element => {
  const { clearErrors, setError, setValue, getValues } = useFormContext()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const formImage = getValues(formId)
    formImage && setPreviewImage(formImage)
  }, [formId])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }

    const file = files[0]
    const urlImage = URL.createObjectURL(file)

    setPreviewImage(urlImage)
    console.log('URL IMAGE::', urlImage)
    setValue(formId, urlImage)
  }

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setError!(formId, {
        type: 'required',
        message: 'Please, upload a valid image.',
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
        <div className="relative z-0">
          <div className="z-0 flex h-32 w-32 items-center justify-center rounded-lg bg-grey-light sm:h-64 sm:w-64">
            <Camera />
          </div>
          <input
            {..._props}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute left-0 top-0 z-30 h-full w-full cursor-pointer opacity-0"
          />
          {previewImage && (
            <Image
              src={previewImage}
              alt=""
              width={240}
              height={240}
              className="absolute left-0 top-0 z-20 h-full w-full rounded-lg object-cover"
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

export default ImageUpload
