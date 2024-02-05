import { useCreateActivityContext } from '@/contexts/create-activity/CreateActivityContext'

// Local Components
import { AnimatePresence, motion } from 'framer-motion'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function Sections(): JSX.Element {
  const { section } = useCreateActivityContext()
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
        className="flex grow flex-col"
      >
        <div className="flex grow flex-col">{section?.content}</div>
      </motion.div>
    </AnimatePresence>
  )
}
