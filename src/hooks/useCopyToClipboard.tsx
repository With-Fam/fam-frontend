import toast from 'react-hot-toast'
import { useRef, useState } from 'react'

const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState(false)
  const copiedTimeout = useRef<NodeJS.Timeout | null>(null)

  const copyToClipboard = async (text: any) => {
    await navigator.clipboard.writeText(text)
    toast.success('copied!')
    setCopySuccess(true)

    copiedTimeout.current = setTimeout(() => {
      setCopySuccess(false)
    }, 500)
  }

  return {
    copyToClipboard,
    copySuccess,
  }
}

export default useCopyToClipboard
