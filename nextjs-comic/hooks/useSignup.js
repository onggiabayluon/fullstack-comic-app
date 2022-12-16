import { register } from '@/services/userService'
import toast from 'react-hot-toast'
import { useAsyncFn } from './useAsync'
import { useAuthState } from './useAuthState'
import { useLogin } from './useLogin'

export const useSignup = () => {
  const { dispatch, setToken } = useAuthState()

  const { execute: signupFn, loading, error, setError } = useAsyncFn(register)

  const { loginUser, error: loginError } = useLogin()

  const signupUser = (username, password, password2, onCloseBtnClick) => {
    return signupFn({ username, password, password2 })
      .then((data) => {
        // save the token to local storage
        // setToken(data)

        // update the user state
        // dispatch({ type: USER_ACTIONS.REGISTER, payload: data })

        toast.success('Signup succesfully')

        // Login and close form
        loginUser(username, password, onCloseBtnClick)
      })
      .catch((err) => setError(err))
  }

  return { signupUser, loading, error, loginError }
}
