import { useAuthState } from '@/hooks/useAuthState'
import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { useMemo } from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

const WithAxios = ({ children }) => {
  const { setToken } = useAuthState()

  const axiosInstance = axios.create({
    baseURL,
  })

  useMemo(() => {
    axiosInstance.interceptors.request.use(async (req) => {
      const token = JSON.parse(localStorage.getItem('token'))
      console.log(token)
      if (!token) return

      // interceptors cant get token outside
      // so we need to get token for each request using localstorage
      req.headers.Authorization = token ? `Bearer ${token.access}` : ''
      const user = token && jwtDecode(token.access)
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

      if (!isExpired) return req

      const response = await axios.post(`${baseURL}api/token/refresh/`, {
        refresh: token?.refresh,
      })

      setToken(response.data)

      req.headers.Authorization = `Bearer ${response.data.access}`
      return req
    })
  }, [axiosInstance.interceptors.request, setToken])

  return children
}

export default WithAxios
