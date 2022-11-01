import { AuthStateContext } from '@/contexts/AuthProvider'
import { useContext } from 'react'

export const useAuthState = () => {
  const context = useContext(AuthStateContext)

  if (!context) {
    throw Error('useAuthState must be used inside an AuthContextProvider')
  }

  return context
}
