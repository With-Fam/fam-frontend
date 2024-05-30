'use client'
// Third Parties
import { AppProgressBar } from 'next-nprogress-bar'

/*-------------------------------------------------------------------*/

/**
 * Component
 */

const ProgressBar = (): JSX.Element => (
  <AppProgressBar
    height="3px"
    color="#FFE500"
    options={{ showSpinner: false }}
    shallowRouting
  />
)

export default ProgressBar
