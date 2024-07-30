'use client'

import { BaseSyntheticEvent, useRef, useState } from 'react'

import { uploadFile } from '@/lib/ipfs-service'
import { Loading } from '@/components/shared'
import { Maybe } from '@/types'
import { Paragraph } from '@/stories'
import { Upload } from '@/components/icons'
import Image from 'next/image'
import { Icon } from '@/components/Icon'

type UploadIPFSProps = {
  value?: string
  name: string
  onChange: (a?: string) => void
}

type UploadState = {
  loading: boolean
  progress?: number
}

const UploadImage = ({
  name,
  onChange,
  value,
}: UploadIPFSProps): JSX.Element => {
  const [mediaUrl, setMediaUrl] = useState<any>(null)
  const inputRef = useRef<Maybe<HTMLInputElement>>(null)
  const [{ loading, progress }, setUploadState] = useState<UploadState>({
    loading: false,
    progress: undefined,
  })

  async function handleChange(e: BaseSyntheticEvent) {
    if (loading) return
    setUploadState((_state) => ({ ..._state, loading: true }))
    const [file] = e.currentTarget.files
    if (!file.type.includes('image')) return
    try {
      const { uri } = await uploadFile(file)
      onChange(uri)
      const imageUrl = URL.createObjectURL(file)
      setMediaUrl(imageUrl)
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
    <div className="mt-4 flex w-full items-center justify-center rounded-[8px] bg-white py-6">
      <div className="flex w-full justify-between px-8 md:w-[600px] md:px-4">
        {value && mediaUrl ? (
          <>
            <div className="relative h-[80px] w-[80px] overflow-hidden rounded-[8px]">
              <Image
                src={mediaUrl}
                alt="not found image"
                layout="fill"
                className="!w-full object-cover"
              />
            </div>
            <button type="button" onClick={() => onChange('')}>
              <Icon id="trash" fill="#d2d2d2" />
            </button>
          </>
        ) : (
          <label
            htmlFor={name}
            className="flex w-full items-center justify-start gap-8"
          >
            {loading ? (
              <>
                <div className="mb-1 text-base font-medium text-gray-400">
                  Upload progress {progress}%
                </div>

                <Loading />
              </>
            ) : (
              <>
                <div className="cursor-pointer rounded-[8px] border border-grey-light p-6">
                  <Upload className="h-8 w-8 rounded-full bg-grey-light p-2 text-gray-500" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Paragraph as="p4" className="font-abc text-grey">
                    Add a thumbnail
                  </Paragraph>
                  <Paragraph as="p6" className="font-abc text-grey">
                    PNG, JPEG and GIF supported.
                  </Paragraph>
                </div>
              </>
            )}
            <input
              ref={inputRef}
              disabled={loading}
              onChange={handleChange}
              id={name}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  )
}

export default UploadImage
