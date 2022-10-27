import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { useAuthContext } from '../useAuthContext'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT
const useAxios = () => {
  const { setAuthTokens } = useAuthContext()
  // const [authTokens, setAuthTokens] = useStorage('authTokens')

  const axiosInstance = axios.create({
    baseURL,
    // headers: { Authorization: `Bearer ${authTokens?.access}` },
  })

  // console.log(token)

  axiosInstance.interceptors.request.use(async (req) => {
    // interceptors cant get authTokens outside
    // so we need to get token for each request using localstorage
    const token = JSON.parse(localStorage.getItem('authTokens'))
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

  function makeAuthRequest(url, options) {
    return axiosInstance(url, options)
      .then((res) => {
        if (res.data != '') return res.data
        else return res
      })
      .catch((error) => {
        console.log(error)
        return Promise.reject(
          error?.response?.data?.message ??
            error?.response?.statusText ??
            error?.response?.data?.detail ??
            error?.message ??
            'error'
        )
      })
  }

  return { makeAuthRequest }
}

export default useAxios
