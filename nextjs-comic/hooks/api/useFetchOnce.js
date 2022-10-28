import { makeRequest } from '@/lib/utils/httpRequest'
import useSWR from 'swr'
const defaultFnc = () => {}

const fetcher = makeRequest

function useFetchOnce(url, options, callback = defaultFnc, condition) {
  // fetch once
  const { data, error } = useSWR(condition ? url : null, fetcher)

  return {
    data: data ? callback(data.results) : data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFetchOnce
