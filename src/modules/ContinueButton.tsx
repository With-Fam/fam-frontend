/**
 * Component
 */

import { Button } from '@/components/shared'

const ContinueButton = (): JSX.Element => (
  <div className="mt-4 flex h-20 w-full justify-end">
    <Button
      type="submit"
      className="fixed bottom-4 left-4 right-4 sm:relative sm:top-8"
    >
      Continue
    </Button>
  </div>
)
export default ContinueButton
