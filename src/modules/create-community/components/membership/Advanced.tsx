import React from 'react'
import { Icon } from '@/components/Icon'
import AcceptanceThreshold from './AcceptanceThreshold'
import VotePeriod from '@/modules/create-community/components/membership/VotePeriod'
import { useFormStore } from '@/modules/create-community/stores'

const Advanced = () => {
  const { setShowAdvanced, showAdvanced } = useFormStore()

  return (
    <>
      <button
        type="button"
        className="mx-auto mt-4 flex items-center gap-1 rounded-full bg-orange-light px-3 py-2 text-orange"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        Advanced
        {showAdvanced ? (
          <Icon id="chevronUp" fill={'#f54d18'} />
        ) : (
          <Icon id="chevronDown" fill={'#f54d18'} />
        )}
      </button>
      {showAdvanced && (
        <>
          <AcceptanceThreshold />
          <VotePeriod />
        </>
      )}
    </>
  )
}

export default Advanced
