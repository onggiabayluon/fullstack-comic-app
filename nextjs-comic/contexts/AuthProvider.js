import useStorage from '@/hooks/useStorage'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useReducer } from 'react'

const AuthContext = createContext()

export default AuthContext

export const USER_ACTIONS = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return jwtDecode(action.payload.access)
    case USER_ACTIONS.REGISTER:
      break
    case USER_ACTIONS.LOGOUT:
      return null
    default:
      return state
  }
}
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens, removeAuthTokens] = useStorage('authTokens', null)

  const [state, dispatch] = useReducer(userReducer, null)

  const contextData = {
    state,
    authTokens,
    dispatch,
    setAuthTokens,
  }

  // Trigger login 1 time when user go to website
  useEffect(() => {
    if (authTokens) {
      dispatch({ type: USER_ACTIONS.LOGIN, payload: authTokens })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
