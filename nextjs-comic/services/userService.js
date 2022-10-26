import useAxios from '@/hooks/auth/useAxios'
import { makeRequest } from '@/lib/utils/httpRequest'

const useUserApi = () => {
  const { makeAuthRequest } = useAxios()

  const getCurrentUserUrl = {
    fetcher: makeAuthRequest,
    url: 'users/current-user',
  }

  return {
    getCurrentUserUrl,
  }
}

export function login({ username, password }) {
  return makeRequest(`api/token/`, {
    method: 'POST',
    data: { username, password },
  })
}

export function register({ username, password, password2 }) {
  return makeRequest(`api/register/`, {
    method: 'POST',
    data: { username, password, password2 },
  })
}

export default useUserApi
