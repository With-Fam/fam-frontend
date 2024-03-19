// Local Components
import { Cross, ExitIcon, EyeIcon, MemberIcon } from '@/components/icons'
import MenuItem from '@/components/shared/Navbar/MenuItem'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useState } from 'react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useChainStore } from '@/utils/stores/useChainStore'

// Props
type MenuListProps = {
  address: `0x${string}`
}

/*-------------------------------------------------------------------*/

/**
 * Component
 */

const MenuList = ({ address }: MenuListProps): JSX.Element => {
  const { logout } = useCheckAuth()
  const { network } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const { chain }: any = useNetwork()
  const [selectedNetwork, setSelectedNetwork] = useState(chain)
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const currentChains: string[] = []
  chains.map((chain: any) => {
    currentChains.push(chain.network)
  })

  const switched = async (net: number) => {
    await switchNetwork?.(Number(net))
    const selected: any = chains.find((chain: any) => chain.id === net)
    const isIncluded = currentChains.some((option) => pathname.includes(option))
    if (isIncluded && selected) {
      const selectedNetwork = selected.network
      const newPath = pathname.replace(network as string, selectedNetwork)
      router.push(newPath)
    } else {
      router.push(pathname)
    }
    setSelectedNetwork(selected)
    useChainStore.setState({ chain: selected })
  }
  return (
    <ul className="mt-8 grid gap-6">
      <MenuItem
        icon={<Cross className="h-6 w-6" color="#000000" />}
        href="/create-community"
      >
        Create a Fam
      </MenuItem>
      <MenuItem
        icon={<MemberIcon className="h-6 w-6" color="#000000" />}
        href={`/profile/${selectedNetwork?.slug}/${address}`}
      >
        Profile
      </MenuItem>
      <MenuItem
        icon={<EyeIcon className="h-6 w-6" />}
        href={`/explore/${selectedNetwork?.slug}`}
      >
        Explore
      </MenuItem>
      <div className="pointer-events-auto block h-12">
        <select
          className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
          onChange={(e) => switched(Number(e.target.value))}
          value={selectedNetwork?.id || ''}
          disabled={pathname.includes('community')}
        >
          {chains.map((x: any) => (
            <option
              disabled={!switchNetwork || x.id === selectedNetwork?.id}
              key={x.id}
              value={x.id}
            >
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <MenuItem onClick={logout} icon={<ExitIcon className="h-6 w-6" />}>
        Disconnect
      </MenuItem>
    </ul>
  )
}

export default MenuList
