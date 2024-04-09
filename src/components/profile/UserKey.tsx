'use client'
// Framework
import { useState, useEffect, useRef } from 'react'

// Local Components
import { Paragraph } from '@/stories'
import { Copy } from '@/components/icons'

// Utils
import { shortenString } from '@/utils/user-profile'

// Types
interface UserKeyProps {
  children: string
  address: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserKey = ({ children, address }: UserKeyProps): JSX.Element => {
  const [copySuccess, setCopySuccess] = useState(false)
  const copiedTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(address)
    setCopySuccess(true)

    copiedTimeout.current = setTimeout(() => {
      setCopySuccess(false)
    }, 1200)
  }

  useEffect(() => {
    if (copiedTimeout.current) {
      clearTimeout(copiedTimeout.current)
    }
  }, [])

  return (
    <Paragraph as="p5" className="flex gap-1 text-grey">
      {shortenString({ longString: children })}
      <span className="ml cursor-pointer" onClick={handleCopyClick}>
        <Copy />
      </span>
      {copySuccess && <span className="ml text-green-500">Copied!</span>}
    </Paragraph>
  )
}

export default UserKey
