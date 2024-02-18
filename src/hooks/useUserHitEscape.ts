import { useEffect } from 'react'

/**
 * Custom hook that listens for the 'Escape' key press and invokes the provided callback function.
 * @param callback - The function to be called when the 'Escape' key is pressed.
 */
const useUserHitEscape = (callback: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [callback])
}

export default useUserHitEscape
