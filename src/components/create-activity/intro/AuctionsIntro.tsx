'use client'

// Framework
import dynamic from 'next/dynamic'

// Third Parties
import { useFormContext } from 'react-hook-form'
const DescriptionEditor = dynamic(
  () => import('@/components/create-activity/intro/DescriptionEditor'),
  {
    ssr: false,
  }
) // Quill library requires a dynamic import to not break SSR

// Components
import TitleInput from '@/components/create-activity/intro/TitleInput'
import { Paragraph } from '@/stories'
import { PhaseName } from '@/components/shared'

// Types

const AuctionsIntro = (): JSX.Element => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <PhaseName>New activity</PhaseName>
      </div>
      <div className=" flex grow flex-col justify-between">
        <div className="order-1 sm:order-2">
          <TitleInput
            placeholder="Title"
            name="title"
            className="block w-full text-lg outline-0"
          />
          {errors.title && (
            <Paragraph as="p5" className="mb-2 px-4 text-status-red">
              A title is required
            </Paragraph>
          )}
        </div>
        <DescriptionEditor />
      </div>
    </>
  )
}
export default AuctionsIntro
