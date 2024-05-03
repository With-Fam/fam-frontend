'use client'
import {
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { useParams } from 'next/navigation'
import getDaoAddresses from '@/data/contract/requests/getDaoAddresses'
import { useDaoStore } from '@/modules/dao'
import { useAccount } from 'wagmi'

/**
 * Component
 */

type DaoStoreContextType = {
  addresses: any
  setAddresses: Dispatch<SetStateAction<any>>
}
const DaoStoreContext = createContext<DaoStoreContextType>({
  addresses: {},
  setAddresses: () => null,
})

const DaoContext = ({ children }: PropsWithChildren): JSX.Element => {
  const { addresses, setAddresses } = useDaoStore()
  const { chain } = useAccount()
  const { community } = useParams()

  useEffect(() => {
    async function getAddresses(chainId: number) {
      try {
        const addresses = await getDaoAddresses(
          chainId,
          community as `0x${string}`
        )

        setAddresses(addresses as any)
      } catch (e) {
        console.log('error::', e)
      }
    }

    if (community && chain?.id) {
      getAddresses(chain?.id)
    }
  }, [community, chain])
  return (
    <DaoStoreContext.Provider
      value={{
        addresses,
        setAddresses,
      }}
    >
      {children}
    </DaoStoreContext.Provider>
  )
}

const useDaoContext = (): DaoStoreContextType => useContext(DaoStoreContext)

export { DaoContext, DaoStoreContext, useDaoContext }
