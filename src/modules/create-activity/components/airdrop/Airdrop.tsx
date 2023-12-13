// Framework
import { Stack, Text } from '@zoralabs/zord'
import { Interface } from 'ethers'
import { useContractRead } from 'wagmi'

// Chain
import { auctionAbi, tokenAbi } from '@/data/contract/abis'
import { useDaoStore } from '@/modules/dao'
import { useChainStore } from '@/utils/stores/useChainStore'
import { getEnsAddress } from '@/utils/ens'
import { walletSnippet } from '@/utils/helpers'
import { getProvider } from '@/utils/provider'

// Types
import { TransactionType } from '@/modules/create-activity/types'
import { type AddressType, CHAIN_ID } from '@/types'

//Hooks
import { useProposalStore } from '@/modules/create-activity/stores'

// Local components
import { AirdropForm } from './AirdropForm'
import { AirdropFormValues } from './AirdropForm.schema'

type AirdropProps = {
  callback: () => void
}

export function Airdrop({ callback }: AirdropProps): JSX.Element {
  const addresses = useDaoStore((state) => state.addresses)
  const transactions = useProposalStore((state) => state.transactions)
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const chain = useChainStore((x) => x.chain)

  const { data: auctionOwner } = useContractRead({
    abi: auctionAbi,
    address: addresses?.auction,
    functionName: 'owner',
    chainId: chain.id,
  })

  const { data: isMinter } = useContractRead({
    // can only check minter on contracts where version >= 1.2.0
    // enabled: gte(currentVersions?.token, AIRDROP_CONTRACT_VERSION),
    abi: tokenAbi,
    address: addresses?.token,
    chainId: chain.id,
    functionName: 'isMinter',
    args: [addresses?.treasury as AddressType],
  })

  const handleAirdropTransaction = async (values: AirdropFormValues) => {
    if (!values.recipientAddress) return
    // We are dropping memberships so hard coding this to 1
    const amount = 1

    const { recipientAddress: recipient } = values

    const tokenInterface = new Interface(tokenAbi)

    const updateMinterTransaction = {
      functionSignature: 'updateMinters',
      target: addresses?.token as AddressType,
      value: '',
      calldata: tokenInterface.encodeFunctionData(
        'updateMinters((address,bool)[])',
        [[{ minter: addresses?.treasury, allowed: true }]]
      ),
    }

    const resolvedRecipientAddress = await getEnsAddress(
      recipient || '',
      getProvider(CHAIN_ID.ETHEREUM)
    )
    const airdropTransaction = {
      functionSignature: 'mintBatchTo',
      target: addresses?.token as AddressType,
      value: '',
      calldata: tokenInterface.encodeFunctionData(
        'mintBatchTo(uint256,address)',
        [amount, resolvedRecipientAddress]
      ),
    }

    const doesNotContainUpdateMinter =
      transactions.findIndex(
        (transaction) => transaction.type === TransactionType.UPDATE_MINTER
      ) === -1

    if (!isMinter && doesNotContainUpdateMinter) {
      addTransaction({
        type: TransactionType.UPDATE_MINTER,
        summary: `Authorise community Treasury to mint new tokens`,
        transactions: [updateMinterTransaction],
      })
    }

    addTransaction({
      type: TransactionType.AIRDROP,
      summary: `Airdrop a membership to ${walletSnippet(recipient)}`,
      transactions: [airdropTransaction],
    })
    callback()
  }

  const isTreasuryContractOwner = auctionOwner === addresses?.treasury
  if (!isTreasuryContractOwner) {
    return (
      <Stack>
        <Text color="negative">
          You need to run an auction in order to access airdrops.
        </Text>
      </Stack>
    )
  }

  return <AirdropForm onSubmit={handleAirdropTransaction} />
}
