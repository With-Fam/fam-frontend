'use client'

import { BaseSyntheticEvent, useRef, useState } from 'react'

import { uploadFile } from '@/lib/ipfs-service'
import { twMerge } from 'tailwind-merge'
import { IPFSImage } from '@/components/ipfs/IPFSImage'
import { Loading } from '@/components/shared'
import { Upload } from '@/components/icons'
import { Maybe } from '@/types'
import { Paragraph } from '@/stories'
import IPFSMedia from '@/components/ipfs/IPFSMedia'

type UploadIPFSProps = {
  value?: string
  name: string
  onChange: (a?: string) => void
  callback: any
  isMedia: boolean
}

type UploadState = {
  loading: boolean
  progress?: number
}

const UploadMedia = ({
  name,
  onChange,
  value,
  callback,
  isMedia,
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
    if (file.type.includes('audio')) callback(true)
    else callback(false)

    try {
      const { uri } = await uploadFile(file)
      onChange(uri)
      const audioURL = URL.createObjectURL(file)
      setMediaUrl(audioURL)
    } catch (err) {
      console.log('err::', err)
    } finally {
      setUploadState((_state) => ({
        ..._state,
        loading: false,
      }))
    }
  }

  const onCancel = () => {
    onChange('')
    callback(false)
  }

  return (
    <div className="mt-10 flex w-full items-center justify-center">
      {isMedia ? (
        <>
          {mediaUrl && value && (
            <IPFSMedia src={mediaUrl} onCancel={onCancel} />
          )}
        </>
      ) : (
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
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 p-5">
              {loading ? (
                <>
                  <div className="mb-1 text-base font-medium text-gray-400">
                    Upload progress {progress}%
                  </div>

                  <Loading />
                </>
              ) : (
                <>
                  <div className="rounded-full bg-black px-3 py-2 font-abc text-white">
                    Upload
                  </div>
                  <Paragraph as="p4" className="text-grey">
                    Upload an image, video or audio file.
                  </Paragraph>
                </>
              )}
            </div>
          )}
          <input
            ref={inputRef}
            disabled={loading}
            onChange={handleChange}
            id={name}
            type="file"
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}

export default UploadMedia
