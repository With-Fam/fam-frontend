'use client'

// Framework
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

// Local Components
import { Search } from '@/components/icons'

// Types
interface CommunitiesProps {
  type: string
  search: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunitySearch = ({
  type = 'trending',
  search = '',
}: CommunitiesProps): JSX.Element => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState(search)
  const debounceTimerRef = useRef<number | null>(null)
  const keyStrokeTimeLimit = 120

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current)
    }
    setInputValue(event.target.value)
  }

  useEffect(() => {
    debounceTimerRef.current = window.setTimeout(() => {
      if (inputValue === '') {
        router.push(`/explore?type=${type}`)
      } else {
        router.push(`/explore?type=${type}&search=${inputValue}`)
      }
    }, keyStrokeTimeLimit)
  }, [inputValue, router, type])

  return (
    <section className="block px-4 pt-24">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center gap-2 rounded-lg bg-grey-light px-4 py-2">
        <Search />
        <input
          className="flex-1 bg-transparent outline-0"
          type="text"
          name="search-community"
          id="search-community"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search"
        />
      </div>
    </section>
  )
}
export default CommunitySearch
