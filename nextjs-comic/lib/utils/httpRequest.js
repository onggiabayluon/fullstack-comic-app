import axios from 'axios'
const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
})

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options)
  return response.data
}

export function makeRequest(url, options) {
  return httpRequest(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.detail ?? error?.response?.data ?? error)
    )
}

export default httpRequest
