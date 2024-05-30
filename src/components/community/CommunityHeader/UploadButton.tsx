'use client'

import { Upload } from '@/components/icons'

const UploadButton = () => {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white-secondary"
      type="button"
    >
      <Upload className="h-4 w-4" />
    </button>
  )
}

export default UploadButton
