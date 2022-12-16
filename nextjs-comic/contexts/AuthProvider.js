import useFetch from '@/hooks/api/useFetch'
import useStorage from '@/hooks/useStorage'
import useUserApi from '@/services/userService'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useMemo, useReducer } from 'react'

export const AuthStateContext = createContext()
export const AuthDispatchContext = createContext()

export const USER_ACTIONS = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...initialState,
        userDetails: action.payload.user,
      }
    case 'LOGOUT':
      return null
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, {
    userDetails: '',
    isTokenData: null,
    loading: false,
    errorMessage: null,
  })

  const [token, setToken] = useStorage('token')

  const { getCurrentUserUrl } = useUserApi()

  // Get userDetails from db when token changed
  const {
    data: userDetail,
    isLoading: isFetchingUser,
    isError: isFetchingError,
    mutate: mutateUser,
  } = useFetch({
    deps: token,
    url: getCurrentUserUrl.url,
    fetcher: getCurrentUserUrl.fetcher,
    swrOptions: {
      dedupingInterval: 0,
    },
  })

  useEffect(() => {
    // Load userDetails from db
    if (userDetail) {
      return dispatch({
        type: USER_ACTIONS.LOGIN,
        payload: { user: { ...userDetail, isTokenData: false } },
      })
    }
    /* 
      Persist data if user has loggedin before
      Load userDetails from token data
    */
    if (token && token.access) {
      return dispatch({
        type: USER_ACTIONS.LOGIN,
        payload: { user: { ...jwtDecode(token.access), isTokenData: true } },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail])

  const contextData = useMemo(
    () => ({
      user: user?.userDetails,
      isUserFetched: !!(user?.userDetails && !user?.isTokenData),
      isFetchingUser,
      isFetchingError,
      setToken,
      mutateUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return (
    <AuthStateContext.Provider value={contextData}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
