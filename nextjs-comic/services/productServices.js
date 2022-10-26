import { makeRequest } from '@/lib/utils/httpRequest'

const useProductApi = () => {
  const getCoinsUrl = {
    fetcher: makeRequest,
    url: 'coins/',
  }

  return {
    getCoinsUrl,
  }
}

export default useProductApi
