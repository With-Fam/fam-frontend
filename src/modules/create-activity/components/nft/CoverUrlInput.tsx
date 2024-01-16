// Framework
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

// Utils
import { SingleIPFSMediaUpload } from '@/components/ipfs'

// Types
import { Maybe } from '@/types'
import { CreateNFTFormValues } from './CreateNFT.schema'
import { MotionShow } from '@/components/shared'

export function CoverUrlInput(): Maybe<JSX.Element> {
  const { control, setValue } = useFormContext<CreateNFTFormValues>()
  const mediaType = useWatch<CreateNFTFormValues>({
    control,
    name: 'mediaType',
  })

  useEffect(() => {
    return () => {
      setValue('coverUrl', '')
    }
  }, [setValue])

  if (!mediaType || mediaType.toString().startsWith('image/')) return null

  return (
    <MotionShow>
      <div className="col-span-2">
        <Controller
          control={control}
          name="coverUrl"
          render={({ field }) => (
            <SingleIPFSMediaUpload
              label="Cover image"
              accept="image/*"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </MotionShow>
  )
}
