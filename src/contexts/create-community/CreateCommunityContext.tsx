'use client'

// Framework
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'

// Components
import { ErrorBox, Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'
import { useFormStore } from '@/modules/create-community'
import { AuctionSettingsFormValues } from '@/modules/create-community/components/auctions/AuctionForm.schema'
import { ConfirmForm } from '@/modules/create-community/components/confirm'
import { ReviewForm } from '@/modules/create-community/components/review'
import {
  Artwork,
  AuctionsForm,
  GeneralForm,
  GeneralFormValues,
} from '@/modules/create-community/components'

// Types
import type { CreateSection } from '@/modules/create-community/types'
import { useNetwork } from 'wagmi'
import { L2ChainType } from '@/constants/addresses'
export interface CreateCommunityContextType {
  loading: boolean
  section: CreateSection
  step: number
  next: () => void
  prev: () => void
  title: string
}

const CreateCommunityContext = createContext<CreateCommunityContextType>({
  loading: false,
  section: { order: -1, title: '', key: '', content: <></> },
  step: 0,
  next: () => null,
  prev: () => null,
  title: '',
})

// Helpers
import { getDateYearsFromNow } from '@/utils/helpers'
import { useCheckAuth } from '@/hooks/useCheckAuth'
let sections: CreateSection[] = []

// IMPORTANT: Create loading component
const CreateCommunityProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { chain } = useNetwork()
  const {
    isAuthenticated,
    wagmiData: { address },
  } = useCheckAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const {
    activeSection,
    general: gDefault,
    founderAllocation,
    vetoPower,
    vetoerAddress,
    auctionSettings,
    setActiveSection,
    setFounderAllocation,
    setGeneral,
    setVetoPower,
    setVetoerAddress,
    setReservePrice,
    setFulfilledSections,
  } = useFormStore()

  useEffect(() => {
    setLoading(false)
  }, [])

  const navigate = useCallback(
    (a: number) => {
      if (a > activeSection) {
        setFulfilledSections(sections[activeSection].key)
      }
      setActiveSection(a)
    },
    [activeSection, setActiveSection, setFulfilledSections]
  )

  const next = () => {
    navigate(activeSection + 1)
  }
  const prev = () => {
    navigate(activeSection - 1)
  }

  sections = useMemo(() => {
    const generalSubmit = (_values: GeneralFormValues): void => {
      setGeneral(_values)
      navigate(1)
    }

    const general: CreateSection = {
      order: 0,
      title: 'Community profile',
      key: 'general',
      content: (
        <GeneralForm defaultValues={gDefault} onSubmit={generalSubmit} />
      ),
    }

    const auctionSubmit = ({
      auctionReservePrice,
      founderAllocation,
      vetoPower,
      vetoerAddress,
    }: AuctionSettingsFormValues) => {
      if (vetoPower && vetoerAddress) {
        setVetoPower(vetoPower)
        setVetoerAddress(vetoerAddress)
      }
      setFounderAllocation(founderAllocation)
      setReservePrice(auctionReservePrice)
      navigate(2)
    }

    const auctions: CreateSection = {
      order: 1,
      title: 'Auctions',
      key: 'auctions',
      content: (
        <AuctionsForm
          defaultValues={{
            vetoPower: vetoPower || true,
            vetoerAddress: vetoerAddress || address || '0x',
            auctionDuration: {
              minutes: 0,
              hours: 0,
              seconds: 0,
              days: 7,
            },
            founderAllocation:
              founderAllocation.length > 0
                ? founderAllocation
                : [
                    {
                      founderAddress: address || '0x',
                      allocationPercentage: 10,
                      endDate: getDateYearsFromNow(1),
                      admin: true,
                    },
                  ],
            auctionReservePrice: auctionSettings.auctionReservePrice || 0.05,
          }}
          onSubmit={auctionSubmit}
        />
      ),
    }

    // Artwork self handles state directly through the useFormStoreState hook
    const artwork: CreateSection = {
      order: 2,
      title: 'Artwork',
      key: 'artwork',
      content: <Artwork />,
    }
    const review: CreateSection = {
      order: 3,
      title: 'Confirm',
      key: 'review',
      content: chain && chain.id ? <ConfirmForm /> : <></>,
    }

    const deploy: CreateSection = {
      order: 4,
      title: 'Confirm',
      key: 'deploy',
      content: <ReviewForm />,
    }

    return [general, auctions, artwork, review, deploy]
  }, [
    auctionSettings,
    vetoPower,
    vetoerAddress,
    gDefault,
    founderAllocation,
    navigate,
    setGeneral,
    setReservePrice,
    setFounderAllocation,
    setVetoPower,
    setVetoerAddress,
    chain,
    address,
  ])

  if (!isAuthenticated) {
    return (
      <CreateCommunityContext.Provider
        value={{
          loading,
          step: activeSection,
          section: sections[activeSection],
          next,
          prev,
          title: sections[activeSection]?.title,
        }}
      >
        <ErrorBox
          title="Not this time"
          description="You are not authenticated"
          exitPath="/"
        />
      </CreateCommunityContext.Provider>
    )
  }

  if (typeof chain?.id === 'undefined') {
    return (
      <CreateCommunityContext.Provider
        value={{
          loading,
          step: activeSection,
          section: sections[activeSection],
          next,
          prev,
          title: sections[activeSection]?.title,
        }}
      >
        <ErrorBox
          title="Not this time"
          description="It seems that you are not connected to a wallet. Please log in to continue."
          exitPath="/"
        />
      </CreateCommunityContext.Provider>
    )
  }

  return (
    <CreateCommunityContext.Provider
      value={{
        loading,
        step: activeSection,
        section: sections[activeSection],
        next,
        prev,
        title: sections[activeSection]?.title,
      }}
    >
      <CreateContextNavigation
        step={activeSection}
        prev={prev}
        title={sections[activeSection]?.title}
      />
      {loading && !address && (
        <Loading
          title="Setting the vibes"
          description="Put your feet up and enjoy the tunes"
        />
      )}
      {!loading && address && <>{children}</>}
    </CreateCommunityContext.Provider>
  )
}

const useCreateCommunityContext = (): CreateCommunityContextType =>
  useContext(CreateCommunityContext)

export {
  CreateCommunityContext,
  CreateCommunityProvider,
  useCreateCommunityContext,
}
