import { Cross, ExitIcon, MemberIcon } from '@/components/icons'
import MenuItem from '@/components/shared/Navbar/MenuItem'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useSwitchChain } from 'wagmi'
import { CHAIN_ID } from '@/constants/defaultChains'

type MenuListProps = {
  address: `0x${string}`
}

const MenuList = ({ address }: MenuListProps): JSX.Element => {
  const { logout } = useCheckAuth()
  const { chains } = useSwitchChain()

  const currentChains: string[] = []
  chains.map((chain: any) => {
    currentChains.push(chain.network)
  })

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
        href={`/profile/${CHAIN_ID}/${address}`}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={logout} icon={<ExitIcon className="h-6 w-6" />}>
        Disconnect
      </MenuItem>
    </ul>
  )
}

export default MenuList
