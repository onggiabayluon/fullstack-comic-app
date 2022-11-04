import { login } from '@/services/userService'
import toast from 'react-hot-toast'
import { useAsyncFn } from './useAsync'
import { useAuthDispatch } from './useAuthDispatch'
import { useAuthState } from './useAuthState'

export const useLogin = () => {
  const { dispatch } = useAuthDispatch()
  const { setToken } = useAuthState()

  const { execute: loginFn, loading, error, setError } = useAsyncFn(login)

  const loginUser = (username, password, onCloseBtnClick) => {
    return loginFn({ username, password })
      .then((data) => {
        // save the token to local storage
        setToken(data)

        // Close form
        onCloseBtnClick()

        // Show message
        toast.success('Login succesfully')
      })
      .catch((err) => setError(err))
  }

  return { loginUser, loading, error }
}
