'use client'

import { load, trackPageview } from 'fathom-client'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function TrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    load('DUMRBEZH', {
      includedDomains: ['app.withfam.xyz'],
    })
  }, [])

  useEffect(() => {
    trackPageview()
  }, [pathname, searchParams])

  return null
}

export function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  )
}