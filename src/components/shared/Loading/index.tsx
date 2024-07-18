import { Paragraph } from '@/stories'
import Image from 'next/image'
import Loader from './Loader.png'

type Props = {
  title?: string
  description?: string
  size?: number
}

export const Loading = ({ title, description, size }: Props): JSX.Element => (
  <div className="flex grow flex-col items-center justify-center">
    <div className="space-y-2 text-center">
      <Image
        className="m-auto animate-spin"
        alt="loader"
        width={size || 40}
        height={size || 40}
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
