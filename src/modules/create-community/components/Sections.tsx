import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { AnimatePresence, motion } from 'framer-motion'

export function Sections(): JSX.Element {
  const { section } = useCreateCommunityProvider()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.key}
        variants={{
          exit: {
            y: 10,
            opacity: 0,
          },
          closed: {
            y: 10,
            opacity: 0,
          },
          open: {
            y: 0,
            opacity: 1,
            transition: {
              when: 'afterChildren',
            },
          },
        }}
        initial="closed"
        animate="open"
        exit="exit"
      >
        {section.content}
      </motion.div>
    </AnimatePresence>
  )
}
