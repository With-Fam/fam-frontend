'use client'

import { BaseSyntheticEvent, useRef, useState } from 'react'

import { uploadFile } from '@/utils/ipfs-service'
import { twMerge } from 'tailwind-merge'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
import { Loading } from '@/components/shared'
import { Upload } from '@/components/icons'
import { Maybe } from '@/types'

type UploadIPFSImageProps = {
  value?: string
  name: string
  onChange: (a?: string) => void
}

type UploadState = {
  loading: boolean
  progress?: number
}

export function UploadIPFSImage({
  name,
  onChange,
  value,
}: UploadIPFSImageProps): JSX.Element {
  const inputRef = useRef<Maybe<HTMLInputElement>>(null)
  const [{ loading, progress }, setUploadState] = useState<UploadState>({
    loading: false,
    progress: undefined,
  })

  async function handleChange(e: BaseSyntheticEvent) {
    if (loading) return
    setUploadState((_state) => ({ ..._state, loading: true }))
    const [file] = e.currentTarget.files
    try {
      const { uri } = await uploadFile(file)
      onChange(uri)
    } catch (err) {
      console.log('err::', err)
    } finally {
      setUploadState((_state) => ({
        ..._state,
        loading: false,
      }))
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor={name}
        className={twMerge(
          'relative flex h-72 w-72 flex-col items-center justify-center overflow-clip rounded-lg border border-gray-300 bg-gray-50',
          !loading && 'cursor-pointer hover:bg-gray-100',
          !value && 'border-dashed'
        )}
      >
        {value ? (
          <>
            <IPFSImage
              src={value}
              className="h-auto w-full"
              alt="General daoAvatar image"
            />
            <Upload className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-gray-300 p-2 text-gray-500" />
          </>
        ) : (
          <div className="flex h-auto w-full flex-col items-center justify-center p-5">
            {loading ? (
              <>
                <div className="mb-1 text-base font-medium text-gray-400">
                  Upload progress {progress}%
                </div>

                <Loading />
              </>
            ) : (
              <>
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, or GIF
                </p>
              </>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          disabled={loading}
          onChange={handleChange}
          accept="image/*"
          id={name}
          type="file"
          className="hidden"
        />
      </label>
    </div>
  )
}
