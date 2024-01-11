import { useEffect, useRef } from 'react'

type Callback = <T extends any[]>(...args: T) => void

export function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = useRef<Callback | undefined>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handler: Callback = (...args) => savedCallback.current?.(...args)

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
