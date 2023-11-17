import { twMerge } from 'tailwind-merge'
import { Upload } from '@/components/icons'

type Props = {
  isEmpty?: boolean
}

export function UploadLabel({ isEmpty = true }: Props): JSX.Element {
  return (
    <div
      className={twMerge(
        'absolute flex flex-col space-y-2 self-center',
        isEmpty ? '' : 'right-4 top-4 z-20'
      )}
    >
      <label
        htmlFor="file-upload"
        className={twMerge(
          'cursor-pointer rounded-full bg-black px-4 py-2 text-white',
          isEmpty ? 'bg-black px-4 py-2 text-white' : 'bg-grey-light p-3'
        )}
      >
        {isEmpty ? 'Upload' : <Upload className="h-4 w-4" />}
      </label>
      {isEmpty && <span className="text-xs text-grey">.png or .svg</span>}
    </div>
  )
}
