/**
 * Component
 */

import { Button } from '@/components/shared'

interface ContinueButtonProps {
  title?: string
  loading?: boolean
}

const ContinueButton = ({
  title = 'Continue',
  loading = false,
}: ContinueButtonProps): JSX.Element => (
  <div className="mt-4 flex h-20 w-full justify-end">
    <Button
      type="submit"
      className="fixed bottom-4 left-4 right-4 sm:relative sm:top-8"
    >
      {loading ? (
        <span>
          Loading<span className="animate-pulse delay-75">.</span>
          <span className="animate-pulse delay-150">.</span>
          <span className="animate-pulse delay-200">.</span>
        </span>
      ) : (
        title
      )}
    </Button>
  </div>
)
export default ContinueButton
