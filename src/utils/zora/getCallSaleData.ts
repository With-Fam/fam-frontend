import { zoraCreatorFixedPriceSaleStrategyABI } from '@zoralabs/protocol-deployments'
import { Interface } from 'ethers'

type GetCallSaleDataType = {
  tokenId: string | number | bigint
  saleStart: string | number | bigint
  saleEnd: string | number | bigint
  maxTokensPerAddress: string | number | bigint
  pricePerToken: string | number | bigint
  fundsRecipient: string
  erc20Address: string
}

const getCallSaleData = ({
  tokenId,
  saleStart,
  saleEnd,
  maxTokensPerAddress,
  pricePerToken,
  fundsRecipient,
  erc20Address,
}: GetCallSaleDataType) => {
  const iface = new Interface(zoraCreatorFixedPriceSaleStrategyABI)

  return iface.encodeFunctionData('setSale', [
    tokenId,
    {
      saleStart,
      saleEnd,
      maxTokensPerAddress,
      pricePerToken,
      fundsRecipient,
    },
  ])
}

export default getCallSaleData
