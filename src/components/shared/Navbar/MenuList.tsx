// Local Components
import { Cross, ExitIcon, EyeIcon, MemberIcon } from '@/components/icons'
import MenuItem from '@/components/shared/Navbar/MenuItem'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
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
  const chain = useChainStore((x) => x.chain)

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
        href={`/profile/${chain.slug}/${address}`}
      >
        Profile
      </MenuItem>
      <MenuItem icon={<EyeIcon className="h-6 w-6" />} href="/explore">
        Explore
      </MenuItem>
      <MenuItem onClick={logout} icon={<ExitIcon className="h-6 w-6" />}>
        Disconnect
      </MenuItem>
    </ul>
  )
}

export default MenuList
