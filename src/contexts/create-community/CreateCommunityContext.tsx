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
import { ConfirmForm } from '@/modules/create-community/components/confirm'
import { ReviewForm } from '@/modules/create-community/components/review'
import {
  GeneralForm,
  GeneralFormValues,
  MembershipForm,
} from '@/modules/create-community/components'

// Types
import type { CreateSection } from '@/modules/create-community/types'
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
import { usePrivy } from '@privy-io/react-auth'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { MembershipFormValues } from '@/modules/create-community/components/membership/MembershipForm.schema'
let sections: CreateSection[] = []

// IMPORTANT: Create loading component
const CreateCommunityProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { authenticated, ready } = usePrivy()
  const { connectedWallet: address } = useConnectedWallet()
  const [loading, setLoading] = useState<boolean>(true)
  const {
    activeSection,
    general: gDefault,
    membership: mDefault,
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
    setMembership,
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

    const membershipSubmit = (_values: MembershipFormValues): void => {
      setMembership(_values)
      navigate(2)
    }

    const membership: CreateSection = {
      order: 1,
      title: 'Memberships',
      key: 'memberships',
      content: (
        <MembershipForm defaultValues={mDefault} onSubmit={membershipSubmit} />
      ),
    }

    const review: CreateSection = {
      order: 2,
      title: 'Confirm',
      key: 'review',
      content: <ConfirmForm />,
    }

    const deploy: CreateSection = {
      order: 3,
      title: 'Confirm',
      key: 'deploy',
      content: <ReviewForm />,
    }

    return [general, membership, review, deploy]
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
    address,
  ])

  if (!authenticated && ready) {
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
