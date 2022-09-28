import { USER_ACTIONS } from '@/contexts/AuthProvider'
import { login } from '@/services/userService'
import { useAsyncFn } from './useAsync'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const { dispatch, setAuthTokens } = useAuthContext()

  const { execute: loginFn, loading, error, setError } = useAsyncFn(login)

  const loginUser = (username, password, onCloseBtnClick) => {
    return loginFn({ username, password })
      .then((data) => {
        // save the token to local storage
        setAuthTokens(data)

        // update the user state
        dispatch({ type: USER_ACTIONS.LOGIN, payload: data })

        // Close form
        onCloseBtnClick()
      })
      .catch((err) => setError(err))
  }

  return { loginUser, loading, error }
}
