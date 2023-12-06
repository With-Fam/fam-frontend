import { Paragraph } from '@/stories'
import Image from 'next/image'
import Loader from './Loader.png'

type Props = {
  title?: string
  description?: string
}

export const Loading = ({ title, description }: Props): JSX.Element => (
  <div className="flex grow flex-col items-center justify-center">
    <div className="space-y-2 text-center">
      <Image
        className="m-auto animate-spin"
        alt="loader"
        width={40}
        height={40}
        src={Loader}
      />
      {title && <Paragraph as="p2">{title}</Paragraph>}
      {description && (
        <Paragraph as="p4" className="text-gray-400">
          {description}
        </Paragraph>
      )}
    </div>
  </div>
)
