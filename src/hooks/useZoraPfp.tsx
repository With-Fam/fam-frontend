import { gradientForAddress } from '@/components/shared/gradient'
import { useMemo } from 'react'

const useZoraPfp = (address: any, ensImage: any) => {
  const zoraPfp = useMemo(() => {
    if (address && !ensImage) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else if (ensImage) {
      return `#FFFFFF`
    } else {
      return 'transparent'
    }
  }, [address, ensImage])

  return {
    zoraPfp,
  }
}

export default useZoraPfp
