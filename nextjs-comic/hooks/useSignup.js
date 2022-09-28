import { USER_ACTIONS } from '@/contexts/AuthProvider'
import { register } from '@/services/userService'
import { useAsyncFn } from './useAsync'
import { useAuthContext } from './useAuthContext'
import { useLogin } from './useLogin'

export const useSignup = () => {
  const { dispatch, setAuthTokens } = useAuthContext()

  const { execute: signupFn, loading, error, setError } = useAsyncFn(register)

  const { loginUser, error: loginError } = useLogin()

  const signupUser = (username, password, password2, onCloseBtnClick) => {
    return signupFn({ username, password, password2 })
      .then((data) => {
        // save the token to local storage
        setAuthTokens(data)

        // update the user state
        dispatch({ type: USER_ACTIONS.REGISTER, payload: data })

        // Login and close form
        loginUser(username, password, onCloseBtnClick)
      })
      .catch((err) => setError(err))
  }

  return { signupUser, loading, error, loginError }
}
