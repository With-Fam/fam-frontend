'use client'

// Third Parties
import { useContractReads } from 'wagmi'
import { metadataAbi } from '@/data/contract/abis'

// Local Components
import { Twitter, Globe, Discord } from '@/components/icons'

// Utils
import { unpackOptionalArray } from '@/utils/helpers'
import { parseContractURI } from '@/utils/parseContractURI'

// Types
import { Address } from 'wagmi'
import { CHAIN_ID } from '@/types/chain'
type SocialMediaItemsProps = {
  metadataAddress: Address
  chainId: CHAIN_ID
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const SocialMediaItems = ({
  metadataAddress,
  chainId,
}: SocialMediaItemsProps): JSX.Element => {
  const metadataContractParams = {
    abi: metadataAbi,
    address: metadataAddress,
    chainId,
  }

  const { data: contractData } = useContractReads({
    allowFailure: false,
    contracts: [
      { ...metadataContractParams, functionName: 'contractURI' },
    ] as const,
  })

  const [contractURI] = unpackOptionalArray(contractData, 1)
  const parsedContractURI = parseContractURI(contractURI)

  if (!contractData) {
    return <></>
  }

  return (
    <div className="mt-6 flex gap-4">
      {parsedContractURI && parsedContractURI.external_url && (
        <a
          href={parsedContractURI.external_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens community's website"
        >
          <Globe />
        </a>
      )}
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Opens community's x page"
      >
        <Twitter />
      </a>
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Opens community's discord server"
      >
        <Discord />
      </a>
    </div>
  )
}

export default SocialMediaItems
