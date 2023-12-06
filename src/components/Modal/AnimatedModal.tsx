import { Flex } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  animatedModal,
  animatedModalContent,
  animatedModalTrigger,
} from './Modal.css'
import { createPortal } from 'react-dom'

interface AnimatedModalProps {
  children: ReactElement
  open?: boolean
  close?: () => void | boolean
  size?: 'small' | 'medium' | 'large' | 'auto'
  trigger?: ReactElement
}

const AnimatedModal = ({
  children,
  open,
  close,
  size = 'small',
  trigger,
}: AnimatedModalProps): JSX.Element => {
  const contentVariants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        ease: 'easeInOut',
      },
    },
  }

  const wrapperVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = useCallback(() => {
    close && typeof close === 'function' && close()
    setIsOpen(false)
  }, [close])

  useEffect(() => {
    if (typeof close === 'boolean') {
      if (close) {
        handleClose()
      }
    }
  }, [close, handleClose])

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          onClick: () => {
            setIsOpen(true)
          },
          className: animatedModalTrigger,
          ...trigger.props,
        })}
      {createPortal(
        <AnimatePresence>
          {(isOpen || open) && (
            <motion.div
              variants={wrapperVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className={animatedModal}
              onClick={() => handleClose()}
            >
              <motion.div
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                onClick={(e) => e.stopPropagation()}
              >
                <Flex
                  direction="column"
                  overflowY="auto"
                  className={animatedModalContent[size]}
                  center
                  mx="auto"
                >
                  {children}
                </Flex>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
export default AnimatedModal
