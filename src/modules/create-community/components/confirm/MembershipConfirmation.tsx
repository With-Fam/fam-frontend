import ConfirmDropDown from '@/modules/create-community/components/confirm/ConfirmDropDown'
import ConfirmItem from '@/modules/create-community/components/confirm/ConfirmItem'
import ConfirmTitle from '@/modules/create-community/components/confirm/ConfirmTitle'
import { useFormStore } from '@/modules/create-community/stores'

const MembershipConfirmation = () => {
  const { membership } = useFormStore()
  return (
    <ConfirmDropDown text="Memberships">
      <div className="px-4 py-6 ">
        <ConfirmItem label="Membership price">
          {membership.membershipPrice} ETH
        </ConfirmItem>
        <ConfirmItem label="Mint Period">
          {membership.mintPeriod} Days
        </ConfirmItem>
        <ConfirmItem label="Revenue Split">
          {membership.revenueSplit}%
        </ConfirmItem>
        <div className="mt-2">
          <ConfirmTitle>{`FOUNDER(S)`}</ConfirmTitle>
          <div className="mt-2 space-y-2">
            {membership.founders.map((founder, i) => (
              <p key={`${founder.founderAddress}-${i}`}>
                {founder.founderAddress}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ConfirmDropDown>
  )
}

export default MembershipConfirmation
