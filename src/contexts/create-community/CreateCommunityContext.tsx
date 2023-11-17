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

import type { CreateSection } from '@/modules/create-community/types'
import {
  Artwork,
  AuctionsForm,
  GeneralForm,
  GeneralFormValues,
  MembershipForm,
} from '@/modules/create-community/components'
import { StartPhase } from '@/components/create-community'

// Components
import { Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'
import { useFormStore } from '@/modules/create-community'
import { AuctionsFormValues } from '@/modules/create-community/components/auctions/schema'
import { ConfirmForm } from '@/modules/create-community/components/confirm'
import { ReviewForm } from '@/modules/create-community/components/review'

export interface CreateCommunityContextType {
  loading: boolean
  section: CreateSection
  step: number
  next: () => void
  prev: () => void
  title: string
}

let sections: CreateSection[] = []

const CreateCommunityContext = createContext<CreateCommunityContextType>({
  loading: false,
  section: { order: -1, title: '', key: '', content: <></> },
  step: 0,
  next: () => null,
  prev: () => null,
  title: '',
})

// IMPORTANT: Create loading component
const CreateCommunityProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
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

  console.log(activeSection)

  const next = () => {
    navigate(activeSection + 1)
  }
  const prev = () => {
    navigate(activeSection - 1)
  }

  sections = useMemo(() => {
    const start: CreateSection = {
      order: 0,
      title: 'New Community',
      key: 'start',
      content: <StartPhase />,
    }

    const generalSubmit = (_values: GeneralFormValues): void => {
      setGeneral(_values)
      navigate(2)
    }

    const general: CreateSection = {
      order: 1,
      title: 'Community profile',
      key: 'general',
      content: (
        <GeneralForm defaultValues={gDefault} onSubmit={generalSubmit} />
      ),
    }

    const membership: CreateSection = {
      order: 2,
      title: 'Membership',
      key: 'membership',
      content: <MembershipForm />,
    }

    const auctionSubmit = ({
      auctionReservePrice,
      founderAllocation,
      vetoPower,
      vetoerAddress,
    }: AuctionsFormValues) => {
      if (vetoPower && vetoerAddress) {
        setVetoPower(vetoPower)
        setVetoerAddress(vetoerAddress)
      }
      setFounderAllocation(founderAllocation)
      setReservePrice(auctionReservePrice)
      navigate(4)
    }

    const auctions: CreateSection = {
      order: 3,
      title: 'Auctions',
      key: 'auctions',
      content: (
        <AuctionsForm
          defaultValues={{
            vetoPower,
            vetoerAddress,
            founderAllocation:
              founderAllocation.length > 0
                ? founderAllocation
                : [
                    {
                      founderAddress: '',
                      allocationPercentage: 0,
                      endDate: '',
                      admin: true,
                    },
                  ],
            auctionReservePrice: auctionSettings.auctionReservePrice,
          }}
          onSubmit={auctionSubmit}
        />
      ),
    }

    // Artwork self handles state directly through the useFormStoreState hook
    const artwork: CreateSection = {
      order: 4,
      title: 'Artwork',
      key: 'artwork',
      content: <Artwork />,
    }
    const review: CreateSection = {
      order: 5,
      title: 'Confirm',
      key: 'review',
      content: <ConfirmForm />,
    }

    const deploy: CreateSection = {
      order: 6,
      title: 'Confirm',
      key: 'deploy',
      content: <ReviewForm />,
    }

    return [start, general, membership, auctions, artwork, review, deploy]
  }, [auctionSettings, vetoPower, vetoerAddress, gDefault])

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
        exitPath="/explore"
        step={activeSection}
        prev={prev}
        title={sections[activeSection]?.title}
      />
      {loading ? (
        <Loading
          title="Setting the vibes"
          description="Put your feet up and enjoy the tunes"
        />
      ) : (
        children
      )}
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
