import { USER_ACTIONS } from '@/contexts/AuthProvider'
import toast from 'react-hot-toast'
import { useAuthDispatch } from './useAuthDispatch'
import { useAuthState } from './useAuthState'

export const useLogout = () => {
  const dispatch = useAuthDispatch()
  const { setToken } = useAuthState()

  const logoutUser = async () => {
    // Remove auth Token
    setToken(null)

    // Logout
    dispatch({ type: USER_ACTIONS.LOGOUT })

    // Message
    toast.success('Logout succesfully')
  }

  return { logoutUser }
}
