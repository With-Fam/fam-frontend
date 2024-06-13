import React from 'react'
import { Icon } from '@/components/Icon'
import { useProposalStore } from '@/modules/create-activity/stores'
import TokenId from '@/modules/create-activity/components/zora-collect/TokenId'
import EthPrice from '@/modules/create-activity/components/zora-collect/EthPrice'

const Advanced = () => {
  const { showAdvancedOfZoraCollect, setShowAdvancedOfZoraCollect } =
    useProposalStore()

  return (
    <>
      <button
        type="button"
        className="mx-auto mt-4 flex items-center gap-1 rounded-full bg-orange-light px-3 py-2 text-orange"
        onClick={() => setShowAdvancedOfZoraCollect(!showAdvancedOfZoraCollect)}
      >
        Advanced
        {showAdvancedOfZoraCollect ? (
          <Icon id="chevronUp" fill={'#f54d18'} />
        ) : (
          <Icon id="chevronDown" fill={'#f54d18'} />
        )}
      </button>
      {showAdvancedOfZoraCollect && (
        <>
          <TokenId />
          <EthPrice />
        </>
      )}
    </>
  )
}

export default Advanced
