'use client'

// Framework
import Link from 'next/link'

// Local Components
import { Arrow } from '@/components/icons'

// Types
type CommunitiesPaginationProps = {
  hasNextPage: boolean
  user: string
  page: string
  network: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunitiesPagination = ({
  user,
  page,
  hasNextPage,
  network,
}: CommunitiesPaginationProps): JSX.Element => {
  const hidePagination = page === '1' && !hasNextPage

  if (hidePagination) return <></>

  return (
    <div className="mt-6 flex w-full items-center justify-center gap-4">
      <Link
        href={
          page === '1' || !page
            ? ''
            : `/profile/${network}/${user}?type=communities&page=${parseInt(page) - 1}`
        }
        passHref
      >
        <button
          aria-label="previous page"
          disabled={page === '1' || !page}
          className="-scale-x-100"
        >
          <Arrow color={page === '1' || !page ? undefined : '#000'} />
        </button>
      </Link>
      <p className="mx-4">Page {page || 1}</p>
      <Link
        href={`/profile/${network}/${user}?type=communities&page=${
          parseInt(page || '1') + 1
        }`}
        passHref
      >
        <button aria-label="Next page" disabled={!hasNextPage}>
          <Arrow color={!hasNextPage ? undefined : '#000'} />
        </button>
      </Link>
    </div>
  )
}

export default CommunitiesPagination
