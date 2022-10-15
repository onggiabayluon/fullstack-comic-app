import { useEffect } from 'react'
import { useOnScreen } from './useOnScreen'

export function useOnScreenOnce(ref) {
  const { isOnScreen, observerRef } = useOnScreen(ref)

  useEffect(() => {
    if (isOnScreen) observerRef.current.disconnect()
  }, [isOnScreen, observerRef])

  return { isOnScreen, observerRef }
}
