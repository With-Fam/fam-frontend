import { useCallback, useEffect, useState } from 'react'
import { Address } from 'viem'

const useMembershipSale = (community: Address) => {
  const [membershipSale, setMembershipSale] = useState<any>(null)
  const [activeSale, setActiveSale] = useState(false)
  const [loading, setLoading] = useState(false)

  const getMembershipSale = useCallback(async () => {
    if (!community) return
    setLoading(true)
    const response = await fetch(
      `/api/party/membershipSales?party=${community}`
    )

    const data = await response.json()
    const sales = data.membershipSales
    const acitveSale = sales.filter((sale: any) => !sale?.finalizedTimestamp)
    if (acitveSale?.length) {
      setMembershipSale(acitveSale[0])
      setActiveSale(true)
    } else {
      setMembershipSale(null)
      setActiveSale(false)
    }
    setLoading(false)
  }, [community])

  useEffect(() => {
    getMembershipSale()
  }, [getMembershipSale])

  return {
    membershipSale,
    getMembershipSale,
    activeSale,
    loading,
  }
}

export default useMembershipSale
