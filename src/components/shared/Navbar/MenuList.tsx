// Third parties
import { Wallet, usePrivy } from '@privy-io/react-auth'
import { useAccount } from 'wagmi'

// Local Components
import { Cross, ExitIcon, EyeIcon, MemberIcon } from '@/components/icons'
import MenuItem from '@/components/shared/Navbar/MenuItem'

// Helpers
import { useChainStore } from '@/utils/stores/useChainStore'

// Props
type MenuListProps = {
  wallet: Wallet | undefined
}

/*-------------------------------------------------------------------*/

/**
 * Component
 */

const MenuList = ({ wallet }: MenuListProps): JSX.Element => {
  const { logout } = usePrivy()
  const { address } = useAccount()
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
        // REMOVE HARDCODED NETWORK
        href={`/profile/${chain.slug}/${wallet?.address || address}`}
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
