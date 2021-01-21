import { useCallback, useEffect, useRef } from "react"

export function useDelayedHandler({ handler }) {
  const startTimer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(startTimer.current)
  }, [startTimer])

  const handle = useCallback(() => {
    startTimer.current = setTimeout(() => {
      handler()
    }, 100)
  }, [startTimer, handler])

  return {
    handle,
  }
}
