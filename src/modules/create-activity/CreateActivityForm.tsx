'use client'

// Framework
import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Third Parties
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'

// Content
import { Loading } from '@/components/shared'

// Types
import { ActivityFormValues } from '@/types/create-activity'

// Schema
import schema from './schema'

// Context
import { useMockStoreContext } from '@/contexts/mock-store'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateActivityForm = ({ children }: PropsWithChildren): JSX.Element => {
  const methods = useForm<ActivityFormValues>({
    resolver: zodResolver(schema),
  })
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const { actions, setActions, setWidgets } = useMockStoreContext()

  useEffect(() => {
    setLoading(false)
  }, [])

  const { handleSubmit } = methods
  const onSubmit = (values: ActivityFormValues) => {
    setLoading(true)
    const randomId = uuidv4()

    setActions([
      ...actions,
      {
        id: randomId,
        date: new Date().toISOString(),
        title: values.title,
        votes: 0,
        status: null,
        description: values.description,
        users: [],
        creator: {
          image: values.image,
          name: 'agcook.eth',
        },
        comments: [],
      },
    ])

    setWidgets([{ ...values, id: randomId }])

    setTimeout(() => {
      setLoading(false)
      router.push(`/community/activity/${randomId}`)
    }, 1000)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex grow flex-col"
      >
        {loading ? (
          <Loading
            title="Setting the vibes"
            description="Put your feet up and enjoy the tunes"
          />
        ) : (
          children
        )}
      </form>
    </FormProvider>
  )
}

export default CreateActivityForm
