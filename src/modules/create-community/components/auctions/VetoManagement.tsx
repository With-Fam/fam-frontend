'use client'

// Framework
import { useEffect } from 'react'

// Local Components
import VetoButton from './VetoButton'
import { Paragraph } from '@/stories'
import { TextInput } from '@/components/forms'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'

const variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VetoManagement = (): JSX.Element => {
  const { control, setValue } = useFormContext()
  const vetoPower = useWatch({ control, name: 'vetoPower' })
  const vetoerAddress = useWatch({ control, name: 'vetoerAddress' })

  // Need to reset vetoAddress if is partially filled and status is toggled
  useEffect(() => {
    if (!vetoerAddress) return
    if (!vetoPower && vetoerAddress?.trim().length > 0)
      setValue('vetoerAddress', null)
  }, [setValue, vetoerAddress, vetoPower])

  return (
    <>
      <Paragraph as="p4" className="mt-6 text-left text-grey-dark">
        In the early stages of your community you may want to add veto power to
        ensure everyone&apos;s aligned and on the same path. You can remove this
        at a later stage through a community vote
      </Paragraph>
      <Controller
        name="vetoPower"
        control={control}
        render={({ field }) => (
          <div className="mt-6 flex gap-2">
            <VetoButton active={vetoPower} onClick={() => field.onChange(true)}>
              Yes
            </VetoButton>
            <VetoButton
              active={!vetoPower}
              onClick={() => field.onChange(false)}
            >
              No
            </VetoButton>
          </div>
        )}
      />
      <AnimatePresence mode="wait">
        {vetoPower && (
          <motion.div
            variants={variants}
            transition={{
              duration: 0.1,
            }}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <div className="mt-6">
              <TextInput
                name="vetoerAddress"
                placeholder="username.eth"
                label="Veto address"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VetoManagement
