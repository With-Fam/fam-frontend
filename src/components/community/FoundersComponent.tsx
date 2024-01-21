'use client'

// Third Parties
import { useContractReads } from 'wagmi'
import { tokenAbi } from '@/data/contract/abis'

// Local Components
import { Heading } from '@/stories'

// Types
import { TokenFragment } from '@/data/subgraph/sdk.generated'
import { CHAIN_ID } from '@/types'
type FoundersComponentProps = {
  token: TokenFragment
  chainId: CHAIN_ID
}

// Utils
import { unpackOptionalArray } from '@/utils/helpers'
import RenderFounder from '@/components/community/RenderFounder'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const FoundersComponent = ({ token, chainId }: FoundersComponentProps): JSX.Element => {
  const tokenContractParams = {
    abi: tokenAbi,
    address: token?.tokenContract,
    chainId,
  }

  const { data: contractData } = useContractReads({
    allowFailure: false,
    contracts: [
      { ...tokenContractParams, functionName: 'getFounders' },
    ] as const,
  })

  const [founders] = unpackOptionalArray(contractData, 1)

  if (!contractData) {
    return <></>
  }

  return (
    <section className="mx-auto mt-4 md:mt-12 max-w-[936px] px-4">
      <Heading as="h5" className="mb-8 font-abcWide text-orange">
        Founders
      </Heading>
      {founders &&
        founders.map((founder, index) => {
          return (
            <RenderFounder
              founderAddress={founder.wallet}
              ownershipPct={founder.ownershipPct}
              key={index}
            />
          )
        })}
    </section>
  )
}

export default FoundersComponent
