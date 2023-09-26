import { Paragraph } from '@/stories'

// Prep Component
const TextLine = ({ children }: { children: string }): JSX.Element => (
  <Paragraph as="p1" className="mb-10">
    {children}
  </Paragraph>
)

export default TextLine
