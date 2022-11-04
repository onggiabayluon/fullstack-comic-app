import useStorage from '@/hooks/useStorage'
import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

// axios instance
const instance = axios.create({
  baseURL,
})

const AxiosInterceptor = ({ children }) => {
  const [token, setToken] = useStorage('token')
  console.log('interceptor')

  useEffect(() => {
    console.log('useEffect')

    const reqInterceptor = async (request) => {
      console.log('reqInterceptor')

      const token = JSON.parse(localStorage.getItem('token'))
      request.headers.Authorization = token ? `Bearer ${token.access}` : ''
      const user = token && jwtDecode(token.access)
      const isExpired = token && dayjs.unix(user.exp).diff(dayjs()) < 1

      if (!isExpired) return request

      const response = await axios.post(`${baseURL}api/token/refresh/`, {
        refresh: token?.refresh,
      })

      setToken(response.data)

      request.headers.Authorization = `Bearer ${response.data.access}`

      return request
    }

    const errInterceptor = (error) => {
      console.log('errInterceptor')
      if (error.request.status === 401) {
        //redirect logic here
      }

      return Promise.reject()
    }

    const interceptor = instance.interceptors.request.use(reqInterceptor, errInterceptor)

    return () => instance.interceptors.request.eject(interceptor)
  }, [setToken])

  return children
}

export default instance
export { AxiosInterceptor }
