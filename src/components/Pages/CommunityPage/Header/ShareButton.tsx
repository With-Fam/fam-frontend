'use client'

import { Upload } from '@/components/icons'
import copyToClipboard from '@/lib/copyToClipboard'
import toast from 'react-hot-toast'

const ShareButton = () => {
  const handleClick = () => {
    copyToClipboard(window.location.href)
    toast.success('link copied!')
  }
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white-secondary"
      type="button"
      onClick={handleClick}
    >
      <Upload className="h-4 w-4" />
    </button>
  )
}
export default ShareButton
