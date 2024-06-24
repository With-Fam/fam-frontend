import { AbiCoder } from 'ethers'

const getEncodedPartyMetadata = (metadata: any) => {
  const encodedMetadata = AbiCoder.defaultAbiCoder().encode(
    [
      'tuple(string name, bytes description, bytes externalURL, bytes image, bytes banner, bytes animationURL, string collectionName, bytes collectionDescription, bytes collectionExternalURL, address royaltyReceiver, uint256 royaltyAmount, uint8 renderingMethod)',
    ],
    [
      {
        ...metadata,
      },
    ]
  )

  return encodedMetadata
}

export default getEncodedPartyMetadata
