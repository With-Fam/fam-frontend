'use client'

// Framework
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Local Components
import { Close, LongArrow } from '@/components/icons'
import { Maybe } from '@/types'
import { Button } from '@/components/shared'
import { useRouter } from 'next/navigation'
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityNavigation = (): Maybe<JSX.Element> => {
  const [isMounted, setIsMounted] = useState(false)
  const [actionsActive, setActionsActive] = useState(true)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--navbar-opacity', '0')

    setIsMounted(true)
    return () => {
      setIsMounted(false)
      root.style.setProperty('--navbar-opacity', '1')
    }
  }, [])

  useEffect(() => {
    if (path === '/create-activity') {
      setActionsActive(true)
    } else {
      setActionsActive(false)
    }
  }, [path])

  if (!isMounted) return null

  return (
    <div className="h-18 flex w-full flex-row items-center justify-between p-4">
      <div className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light">
        {actionsActive ? (
          <div onClick={() => router.push('/community/activity')}>
            <Close />
          </div>
        ) : (
          <div onClick={() => router.back()}>
            <LongArrow />
          </div>
        )}
      </div>
      {actionsActive ? (
        <Button className="px-4 py-2" type="submit">
          <Paragraph as="p5" className="h-4 p-0">
            Post
          </Paragraph>
        </Button>
      ) : (
        <div className="w-0" />
      )}
    </div>
  )
}

export default ActivityNavigation
