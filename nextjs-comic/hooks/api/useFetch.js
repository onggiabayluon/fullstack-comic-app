import { makeRequest } from '@/lib/utils/httpRequest'
import useSWR from 'swr'

const defaultFnc = () => {}

const fetcher = makeRequest

async function useFetch(url, options, callback = defaultFnc) {
  const { data, error } = useSWR([url, options], fetcher)

  return {
    data: data ? callback(data.results) : data,
    rawData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFetch
