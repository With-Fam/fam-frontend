// Local Components
import { Cross, ExitIcon, EyeIcon, MemberIcon } from '@/components/icons'
import MenuItem from '@/components/shared/Navbar/MenuItem'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useNetwork, useSwitchNetwork } from 'wagmi'

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
  const { chain }: any = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const switched = (net: number) => {
    switchNetwork?.(Number(net))
    setTimeout(() => {
      window.location.reload()
    }, 1000)
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
        href={`/profile/${chain?.slug}/${address}`}
      >
        Profile
      </MenuItem>
      <MenuItem
        icon={<EyeIcon className="h-6 w-6" />}
        href={`/explore/${chain?.slug}`}
      >
        Explore
      </MenuItem>
      <div className="pointer-events-auto block h-12">
        <select
          className="rounded-3xl bg-black px-4 py-2 text-white sm:px-6 sm:py-2.5"
          onChange={(e) => switched(Number(e.target.value))}
          value={chain?.id || ''}
        >
          {chains.map((x: any) => (
            <option
              disabled={!switchNetwork || x.id === chain?.id}
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
