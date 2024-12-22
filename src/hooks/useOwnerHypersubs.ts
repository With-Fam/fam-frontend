'use client'

import { useState, useEffect } from 'react'
import { Address } from 'viem'
import useConnectedWallet from '@/hooks/useConnectedWallet'

interface Hypersub {
  id: Address
  title: string
  imageUrl: string
  chainId: number
  address: Address
}

interface UseOwnerHypersubsResult {
  hypersubs: Hypersub[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  selectedHypersub: Hypersub | null
  setSelectedHypersub: (address: Address) => void
}

export const useOwnerHypersubs = (): UseOwnerHypersubsResult => {
  const [hypersubs, setHypersubs] = useState<Hypersub[]>([])
  const [selectedHypersub, setSelectedHypersubState] =
    useState<Hypersub | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { connectedWallet: address } = useConnectedWallet()

  const fetchHypersubs = async () => {
    if (!address) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/dune/hypersub?owner=${address}`)
      if (!response.ok) {
        throw new Error('Failed to fetch hypersub data')
      }
      const data = await response.json()
      setHypersubs(data)
    } catch (err) {
      console.error('Error fetching hypersubs:', err)
      setError(
        err instanceof Error ? err : new Error('Failed to fetch hypersubs')
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHypersubs()
  }, [address])

  const setSelectedHypersub = (address: Address) => {
    const hypersub = hypersubs.find((h) => h.id === address)
    setSelectedHypersubState(hypersub || null)
  }

  return {
    hypersubs,
    loading,
    error,
    refetch: fetchHypersubs,
    selectedHypersub,
    setSelectedHypersub,
  }
}

export default useOwnerHypersubs
