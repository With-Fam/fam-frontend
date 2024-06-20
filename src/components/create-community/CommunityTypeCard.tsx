'use client'

import { Paragraph } from '@/stories'
import { CommunityIcon } from '@/components/create-community'
import { IconProps } from '@/types/create-community'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface CommunityTypeCardProps {
  item: {
    id: string
    title: string
    description: string
    icon: IconProps
  }
}


const CommunityTypeCard = ({ item }: CommunityTypeCardProps): JSX.Element => {
  const { next } = useCreateCommunityProvider()
  const [type, setType] = useState<string>('')

  const handleClick = () => {
    setType(type)
    next()
  }

  return (
    <div
      className="sm:max-w-xm mx-auto mb-2 mt-0 flex w-full max-w-md cursor-pointer flex-row gap-4 rounded-2xl bg-white p-4 sm:mt-6 sm:flex-col sm:p-8"
      onClick={handleClick}
    >
      <div
        className={twMerge(
          'mx-auto flex aspect-square w-16 items-center justify-center rounded-md'
        )}
      >
        <CommunityIcon icon={item.icon} />
      </div>
      <div className="flex flex-col justify-center">
        <Paragraph as="p5" className="mb-2 font-abcWide">
          {item.title}
        </Paragraph>
        <Paragraph as="p5" className="text-grey">
          {item.description}
        </Paragraph>
      </div>
    </div>
  )
}

export default CommunityTypeCard
