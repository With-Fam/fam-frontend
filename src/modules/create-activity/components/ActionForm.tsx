import { TransactionType } from '@/modules/create-activity/types'
import { SendEth } from '@/modules/create-activity'
import { AddressType } from '@/types'
import { ZoraCollect } from '@/modules/create-activity/components/zora-collect'
import { ZoraCreate } from '@/modules/create-activity/components/zora-create'

export type ActionFormProps = {
  action: TransactionType
  callback: () => void
  collectionAddress: AddressType
}

export function ActionForm({ action, callback }: ActionFormProps): JSX.Element {
  switch (action) {
    case 'send-eth':
      return <SendEth callback={callback} />
    case 'zora-collect':
      return <ZoraCollect callback={callback} />
    case 'nft':
      return <ZoraCreate callback={callback} />
    default:
      return <div>Not found!</div>
  }
}
