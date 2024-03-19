'use client'

// Framework
import { useEffect, useMemo, useState } from 'react'

// Components
import TotalAmountBox from '@/components/community/BidComponent/TotalAmountBox'

// Third Parties
import useSWR from 'swr'
import { SDK } from '@/data/subgraph/client'
import { formatEther } from 'viem'
import { useBalance } from 'wagmi'
import { useParams } from 'next/navigation'

// Utils
import { useDaoStore } from '@/modules/dao'
import SWR_KEYS from '@/constants/swrKeys'
import { formatCryptoVal, numberFormatter } from '@/utils/numbers'
import { getChainId } from '@/utils/getChainId'

const COINBASE_ENDPOINT =
  'https://api.coinbase.com/v2/exchange-rates?currency=ETH'

const RaisedComponent = (): JSX.Element => {
  const [totalAuctionSales, setTotalAuctionSales] = useState<string | null>(
    null
  )
  const { addresses } = useDaoStore()
  const { network }: any = useParams()

  const chainId = getChainId(network.toUpperCase().replace('-', '_'))
  const { data: balance } = useBalance({
    address: addresses?.treasury as `0x${string}`,
    chainId: chainId,
  })

  const { data: ethUsd } = useSWR(
    SWR_KEYS.ETH_USD,
    async () => {
      const response = await fetch(COINBASE_ENDPOINT)
      const json = await response.json()
      return json.data.rates.USD
    },
    {
      onError: (error) => {
        console.log('error::', error)
      },
    }
  )

  const treasuryBalance = useMemo(() => {
    return balance?.formatted ? formatCryptoVal(balance?.formatted) : null
  }, [balance])

  const ethToUsd = useMemo(() => {
    if (!balance) return 0
    const wei = balance.value
    const eth = formatEther(wei)
    const usd = ((eth as any) * ethUsd).toFixed(2)
    const usdFormatted = numberFormatter(usd)
    return usdFormatted
  }, [balance, ethUsd])

  useEffect(() => {
    if (addresses.token) {
      SDK.connect(chainId)
        .totalAuctionSales({
          tokenAddress: addresses.token.toLowerCase(),
        })
        .then((sales) => {
          const totalAuctionSales = sales.dao?.totalAuctionSales
          const formattedSales = formatEther(totalAuctionSales)
          const formattedCrypto = formatCryptoVal(formattedSales)
          setTotalAuctionSales(formattedCrypto)
        })
    }
  }, [chainId, addresses.token])

  return (
    <div className="col-span-1">
      {totalAuctionSales && (
        <TotalAmountBox
          title="Total Raised"
          valueEth={totalAuctionSales}
          valueCurrency={ethToUsd}
        />
      )}
      {treasuryBalance && (
        <TotalAmountBox
          title="Community pool"
          valueEth={treasuryBalance}
          valueCurrency={ethToUsd}
        />
      )}
    </div>
  )
}

export default RaisedComponent
