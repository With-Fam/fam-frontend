'use client'

import { BaseSyntheticEvent, useRef, useState } from 'react'
import _get from 'lodash.get'

import { uploadFile } from '@/utils/ipfs-service'
import { twMerge } from 'tailwind-merge'
import { Upload } from '@/components/icons'
import { useFormContext } from 'react-hook-form'

import { InputProps } from '@/components/forms'
import ErrorMessage from '@/components/forms/ErrorMessage'
import { Paragraph } from '@/stories'
import { Maybe } from '@/types'

type SingleIPFSMediaUploadProps = Omit<InputProps, 'onChange'> & {
  onChange: (a?: string) => void
  mediaTypeCallback?: (b: string) => void
}

type UploadState = {
  loading: boolean
  progress?: number
}

export function SingleIPFSMediaUpload({
  accept = '*',
  className,
  label,
  mediaTypeCallback,
  name,
  onChange,
  value,
  ..._props
}: SingleIPFSMediaUploadProps): JSX.Element {
  const { clearErrors, setValue } = useFormContext()
  const inputRef = useRef<Maybe<HTMLInputElement>>(null)
  const [{ loading, progress }, setUploadState] = useState<UploadState>({
    loading: false,
    progress: undefined,
  })

  async function handleChange(e: BaseSyntheticEvent) {
    if (loading) return

    setUploadState((_state) => ({ ..._state, loading: true }))
    const [file] = e.currentTarget.files

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (file.type.startsWith('image/')) {
        setValue('imageBlob', reader.result)
      }
    }

    try {
      const { uri } = await uploadFile(file, {
        onProgress: (progress) => setUploadState((s) => ({ ...s, progress })),
      })
      onChange(uri)
      mediaTypeCallback?.(file.type)
    } catch (err) {
      console.log('err::', err)
    } finally {
      setUploadState((_state) => ({
        ..._state,
        loading: false,
      }))
    }
  }

  const inputText = _get(inputRef, 'current.files.0.name', 'none selected')

  return (
    <div className={twMerge('flex-1', className)}>
      <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
        <label className="mb-2 block font-abcMedium text-sm">{label}</label>
        <div className="flex items-center justify-between space-x-4">
          <label
            htmlFor={name}
            className="flex w-auto cursor-pointer flex-row items-center justify-between space-x-4 rounded-full bg-grey-light px-4 py-2 text-sm text-black"
          >
            <Upload className="mr-2 text-black" color="#000" /> Select
          </label>
          <Paragraph as="p3">{inputText}</Paragraph>
        </div>
        <input
          {..._props}
          ref={inputRef}
          name={name}
          id={name}
          onBlur={() => clearErrors(name)}
          type="file"
          onChange={handleChange}
          accept={accept}
          className="hidden"
        />
        {loading && (
          <div className="mt-2 text-base font-medium text-gray-400">
            Upload progress {progress}%
          </div>
        )}
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}
