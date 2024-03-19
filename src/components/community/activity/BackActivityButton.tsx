'use client'

// Framework
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Local Components
import { LongArrow } from '@/components/icons'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BackActivityButton = (): JSX.Element => {
  const { network, community } = useParams()

  return (
    <div className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light">
      <Link href={`/community/${network}/${community}/activity`} passHref>
        <LongArrow />
      </Link>
    </div>
  )
}

export default BackActivityButton
