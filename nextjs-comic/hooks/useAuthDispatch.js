import { AuthDispatchContext } from '@/contexts/AuthProvider'
import { useContext } from 'react'

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)

  if (!context) {
    throw Error('useAuthDispatch must be used inside an AuthContextProvider')
  }

  return context
}
