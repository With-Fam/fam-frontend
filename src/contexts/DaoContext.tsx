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
  const {
    // networkId,
    communityId,
  } = useParams()

  useEffect(() => {
    if (!communityId) return
    async function getAddresses() {
      // HARDCODED NETWORK ADDRESS
      try {
        const addresses = await getDaoAddresses(5, communityId as `0x${string}`)
        setAddresses(addresses as any)
      } catch (e) {
        console.log('error::', e)
      }
    }
    getAddresses()
  }, [communityId])
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
