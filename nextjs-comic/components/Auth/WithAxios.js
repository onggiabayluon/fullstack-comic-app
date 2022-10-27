import { useAuthContext } from '@/hooks/useAuthContext'
import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { useMemo } from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

const WithAxios = ({ children }) => {
  const { authTokens, setAuthTokens } = useAuthContext()
  const axiosInstance = axios.create({
    baseURL,
    // headers: { Authorization: `Bearer ${authTokens?.access}` },
  })

  useMemo(() => {
    axiosInstance.interceptors.request.use(async (req) => {
      // interceptors cant get authTokens outside
      // so we need to get token for each request using localstorage
      const token = authTokens
      req.headers.Authorization = token ? `Bearer ${token.access}` : ''
      const user = token && jwtDecode(token.access)
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

      if (!isExpired) return req

      const response = await axios.post(`${baseURL}api/token/refresh/`, {
        refresh: token?.refresh,
      })

      setAuthTokens(response.data)

      req.headers.Authorization = `Bearer ${response.data.access}`
      return req
    })
  }, [authTokens, axiosInstance.interceptors.request, setAuthTokens])

  return children
}

export default WithAxios
