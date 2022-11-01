import { USER_ACTIONS } from '@/contexts/AuthProvider'
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
  }

  return { logoutUser }
}
