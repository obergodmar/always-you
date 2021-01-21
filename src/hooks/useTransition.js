import { useCallback, useLayoutEffect, useState } from "react"

export function useTransition() {
  const [isMounted, setMounted] = useState(true)
  const [isShown, setShown] = useState(false)

  const hide = useCallback(() => {
    setMounted(!isMounted)
  }, [isMounted])

  useLayoutEffect(() => {
    const animationTimer = setTimeout(() => {
      setShown(isMounted)
    }, 100)

    return () => {
      clearTimeout(animationTimer)
    }
  }, [isMounted])

  return {
    isShown,
    isMounted,
    hide,
  }
}
