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
import { Copy } from '@/components/icons'
import toast from 'react-hot-toast'

const COINBASE_ENDPOINT =
  'https://api.coinbase.com/v2/exchange-rates?currency=ETH'

type TotalAuctionSales = {
  eth: string | number
  usd: string | number
}

const RaisedComponent = (): JSX.Element => {
  const [totalAuctionSales, setTotalAuctionSales] = useState<TotalAuctionSales>(
    { eth: 0, usd: 0 }
  )
  const { addresses } = useDaoStore()
  const { network }: any = useParams()

  const chainId = useMemo(
    () => getChainId(network.toUpperCase().replace('-', '_')),
    [network]
  )
  const { data: balance } = useBalance({
    address: addresses?.treasury as `0x${string}`,
    chainId,
  })

  const fetchEthUsdRate = async () => {
    const response = await fetch(COINBASE_ENDPOINT)
    const json = await response.json()
    return json.data.rates.USD
  }

  const { data: ethUsd } = useSWR(SWR_KEYS.ETH_USD, fetchEthUsdRate, {
    onError: (error) => {
      console.log('error::', error)
    },
  })

  const treasuryBalance = useMemo(
    () => (balance?.formatted ? formatCryptoVal(balance?.formatted) : null),
    [balance]
  )

  const convertEthToUsd = useMemo(() => {
    if (!balance || !ethUsd) return 0
    const wei = balance.value
    const eth: any = formatEther(wei)
    const usd = (eth * ethUsd).toFixed(2)
    return numberFormatter(usd)
  }, [balance, ethUsd])

  useEffect(() => {
    const fetchTotalAuctionSales = async () => {
      if (addresses.token) {
        const sales = await SDK.connect(chainId).totalAuctionSales({
          tokenAddress: addresses.token.toLowerCase(),
        })
        const totalAuctionSales = sales.dao?.totalAuctionSales
        const formattedSales: any = formatEther(totalAuctionSales)
        const usd = (formattedSales * ethUsd).toFixed(2)
        const usdFormatted = numberFormatter(usd)
        const formattedCrypto = formatCryptoVal(formattedSales)
        setTotalAuctionSales({ eth: formattedCrypto, usd: usdFormatted })
      }
    }
    fetchTotalAuctionSales()
  }, [chainId, addresses.token, ethUsd])

  const handleCopyClick = async () => {
    if (addresses?.treasury) {
      await navigator.clipboard.writeText(addresses.treasury)
      toast.success('Address copied to clipboard.')
    } else {
      toast.error('Address copy failed')
    }
  }

  return (
    <div className="col-span-1">
      {totalAuctionSales && (
        <TotalAmountBox
          title="Total Raised"
          valueEth={totalAuctionSales?.eth}
          valueCurrency={totalAuctionSales?.usd}
        />
      )}
      {treasuryBalance && (
        <TotalAmountBox
          title="Community pool"
          valueEth={treasuryBalance}
          valueCurrency={convertEthToUsd}
        />
      )}
      {addresses?.treasury && (
        <div className="mb-6">
          <p
            className="abc mb-2 text-base text-orange"
            style={{ lineHeight: '20px' }}
          >
            Community pool address
          </p>
          <div className="flex items-center justify-between">
            <p className="abc text-lg leading-8 sm:text-2xl">
              {addresses.treasury.slice(0, 6)}...
              {addresses.treasury.slice(-4)}
            </p>
            <span className="ml cursor-pointer" onClick={handleCopyClick}>
              <Copy />
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RaisedComponent
