import getEthPrice from '@/utils/getEthPrice'
import { useState, useEffect } from 'react'

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(0)

  useEffect(() => {
    const init = async () => {
      const price = await getEthPrice()

      setEthPrice(price)
    }

    init()
  }, [])

  const getEthConversion = (usdAmount: any) => parseFloat(usdAmount) / ethPrice
  const getUsdConversion = (ethAmount: any) =>
    (parseFloat(ethAmount) * ethPrice).toFixed(2)

  return {
    ethPrice,
    getEthConversion,
    getUsdConversion,
  }
}

export default useEthPrice
