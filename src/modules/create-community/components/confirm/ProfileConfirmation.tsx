import ConfirmDropDown from '@/modules/create-community/components/confirm/ConfirmDropDown'
import ConfirmItem from '@/modules/create-community/components/confirm/ConfirmItem'
import ConfirmTitle from '@/modules/create-community/components/confirm/ConfirmTitle'
import { IPFSImage } from '@/components/ipfs'
import { useFormStore } from '@/modules/create-community/stores'

const ProfileConfirmation = () => {
  const { general } = useFormStore()

  return (
    <ConfirmDropDown text="Profile">
      <div className="px-4 py-6 ">
        <div>
          <ConfirmTitle>DAO AVATAR</ConfirmTitle>
          <div className="mt-2">
            <IPFSImage
              src={general.daoAvatar as any}
              alt="dao avatar"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full"
            />
          </div>
        </div>
        <ConfirmItem label="DAO NAME">{general.daoName}</ConfirmItem>
        <ConfirmItem label="DAO SYMBOL">{general.daoSymbol}</ConfirmItem>
        <ConfirmItem label="DAO WEBSITE">{general.daoWebsite}</ConfirmItem>
      </div>
    </ConfirmDropDown>
  )
}

export default ProfileConfirmation
