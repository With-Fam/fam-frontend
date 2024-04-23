import { TransactionType } from '@/modules/create-activity/types'

import {
  Airdrop,
  Crowdfund,
  SendEth,
  UpdateCommunityForm,
  CreateNFT,
  ReviewProposalForm,
} from '@/modules/create-activity'
import { AddressType } from '@/types'
import MigrateToPartyProposalForm from '@/modules/create-activity/components/proposals/migrate-to-party-proposal/MigrateToPartyProposalForm'

export type ActionFormProps = {
  action: TransactionType
  callback: () => void
  collectionAddress: AddressType
}

export function ActionForm({
  action,
  callback,
  collectionAddress,
}: ActionFormProps): JSX.Element {
  switch (action) {
    case 'airdrop':
      return <Airdrop callback={callback} />
    case 'crowd-fund':
      return <Crowdfund callback={callback} />
    case 'send-eth':
      return <SendEth callback={callback} />
    case 'update-community':
      return (
        <UpdateCommunityForm
          callback={callback}
          collectionAddress={collectionAddress}
        />
      )
    case 'nft':
      return <CreateNFT callback={callback} />
    case 'migrate-to-party-proposal':
      return <MigrateToPartyProposalForm />
    default:
      return <div>Not found!</div>
  }
}
