'use client'

import { Paragraph } from '@/stories'
import { XMark } from '@/components/icons'
import { motion } from 'framer-motion'
import Link from 'next/link'

type ErrorBoxProps = {
  title?: string
  description?: string
  exitPath?: string
}

const ErrorBox = ({
  title,
  description,
  exitPath,
}: ErrorBoxProps): JSX.Element => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="flex grow flex-col items-center justify-center"
  >
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <XMark color="#F00" className="h-14 w-14" />
      </div>
      {title && <Paragraph as="p2">{title}</Paragraph>}
      {description && (
        <Paragraph as="p4" className="text-gray-400">
          {description}
        </Paragraph>
      )}
      {exitPath && (
        <Paragraph as="p4" className="pt-8 text-xl text-orange">
          <Link href={exitPath}>Login</Link>
        </Paragraph>
      )}
    </div>
  </motion.div>
)

export default ErrorBox
