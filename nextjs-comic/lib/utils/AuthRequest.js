import axios from '@/lib/utils/axios'

export function makeAuthRequest(url, options) {
  return axios(url, options)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return Promise.reject(error?.response?.data?.detail ?? error?.response?.data ?? error)
    })
}

export default axios
