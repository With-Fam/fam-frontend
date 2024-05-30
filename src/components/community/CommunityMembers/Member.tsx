import { Address } from 'viem'
import dynamic from 'next/dynamic'
import useEnsProfile from '@/hooks/useEnsProfile'
import Image from 'next/image'
import { Paragraph } from '@/stories'

const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

const Member = ({ address }: { address: Address }) => {
  const { profileName, pfpImage } = useEnsProfile(address)

  return (
    <div className="mb-4 flex items-center gap-2 sm:mb-0">
      {pfpImage ? (
        <div className="relative !h-8 !w-8 overflow-hidden rounded-full">
          <Image src={pfpImage} alt="" layout="fill" />
        </div>
      ) : (
        <UserAvatar width={32} height={32} address={address} />
      )}
      {profileName ? (
        <Paragraph as="p3" className="font-abcMedium">
          {profileName}
        </Paragraph>
      ) : (
        <UserName
          className="flex items-center gap-1 font-abcMedium"
          address={address}
        />
      )}
    </div>
  )
}

export default Member
