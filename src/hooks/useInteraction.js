import { useCallback, useEffect, useState } from "react"

export function useInteraction({ handlers, when = true }) {
  const [isDelayed, setDelayed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDelayed(true), 200)

    return () => clearTimeout(timer)
  })

  const handleAction = useCallback(() => {
    if (!when || !isDelayed) {
      return
    }
    handlers.forEach(handler => handler())
  }, [handlers, when, isDelayed])

  useEffect(() => {
    window.addEventListener("keydown", handleAction)
    return () => window.removeEventListener("keydown", handleAction)
  }, [handleAction])

  return {
    eventProps: {
      onTouchStart: handleAction,
      onMouseDown: handleAction,
    },
  }
}
