'use client'

// Framework
import { useEffect, useState } from 'react'

// Third Parties
import { useForm, SubmitHandler } from 'react-hook-form'

// Local Components
import { Close } from '@/components/icons'
import { Paragraph } from '@/stories'
import {
  PinkCircle,
  PurpleDots,
  YellowPolygon,
} from '@/components/icons/create-community'

// Types
interface CommunityInputs {
  type: string
}
interface FormPhases {
  phases: 'start' | 'profile'
}

// Content
import { NEW_COMMUNITY_DATA } from '@/content/create-community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RenderIcon = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => {
  switch (children) {
    case 'PinkCircle':
      return <PinkCircle className={className} />
    case 'PurpleDots':
      return <PurpleDots className={className} />
    case 'YellowPolygon':
      return <YellowPolygon className={className} />
    default:
      return <div />
  }
}

const NewCommunity = (): JSX.Element => {
  const { setValue, handleSubmit } = useForm<CommunityInputs>()
  const [isMounted, setIsMounted] = useState(false)
  const [formPhase, setFormPhase] = useState<FormPhases['phases']>('start')

  const onSubmit: SubmitHandler<CommunityInputs> = (data: CommunityInputs) => {
    console.log(data)
  }

  const handleTypeChange = ({ id }: { id: string }) => {
    setValue('type', id)
    setFormPhase('profile')
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--navbar-opacity', '0')

    setIsMounted(true)
    return () => {
      setIsMounted(false)
      root.style.setProperty('--navbar-opacity', '1')
    }
  }, [])

  if (!isMounted) {
    return <div />
  }

  return (
    <div className="fixed left-0 top-0 z-30 h-full w-full px-4 pt-5 text-left sm:text-center">
      <div
        className="absolute left-4 top-4 w-min cursor-pointer rounded-full p-1"
        style={{ backgroundColor: '#ECECEC' }}
      >
        <Close />
      </div>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        {formPhase === 'start' && (
          <div>
            <Paragraph
              as="p3"
              className="mb-8 text-center font-abcWide text-orange"
            >
              New community
            </Paragraph>
            <Paragraph as="p4" className="mt-0 text-grey-dark sm:mt-40">
              What kind of community would you like to create?
            </Paragraph>
            <div className="flex flex-col gap-0 sm:flex-row sm:gap-6 mt-6 sm:mt-0 max-w-3xl mx-auto">
              {NEW_COMMUNITY_DATA.map((item, index) => (
                <div
                  key={index}
                  className="mb-2 mt-0 sm:mt-6 flex cursor-pointer flex-row gap-4 rounded-2xl bg-white p-4 sm:flex-col sm:p-8 max-w-md sm:max-w-xm mx-auto w-full"
                  onClick={() => handleTypeChange({ id: item.id })}
                >
                  <div className="mx-auto flex items-center justify-center ">
                    {<RenderIcon className="h-12 w-12  sm:h-24 sm:w-24">{item.icon}</RenderIcon>}
                  </div>
                  <div>
                    <Paragraph as="p5" className="mb-2 font-abcWide">
                      {item.title}
                    </Paragraph>
                    <Paragraph as="p5" className="text-grey">
                      {item.description}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {formPhase === 'profile' && (
          <div>
            <div>Profile</div>
            <button type="submit">Continue</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default NewCommunity
