import { Address, encodeFunctionData } from 'viem'

export const hypersubAbi = [
  {
    inputs: [
      { internalType: 'address', name: '_feeRecipient', type: 'address' },
    ],
    name: 'updateFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const getUpdateFeeRecipientCallData = ({
  feeRecipient,
}: {
  feeRecipient: Address
}): `0x${string}` => {
  return encodeFunctionData({
    abi: hypersubAbi,
    functionName: 'updateFeeRecipient',
    args: [feeRecipient],
  })
}
