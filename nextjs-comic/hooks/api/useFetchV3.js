import { makeRequest } from '@/lib/utils/httpRequest'
import useSWR from 'swr'

const TEN_SECONDS = 10000
const swrOpts = {
  dedupingInterval: TEN_SECONDS,
  revalidateOnFocus: false, //automatically revalidate when window gets focused (details)
  revalidateOnReconnect: false, // automatically revalidate when the browser regains a network connection
}
const defaultFetcher = makeRequest

function useFetchV3({ func, deps = true }) {
  const { url, params, fetcher } = func
  const { data, error, mutate } = useSWR(
    deps ? [url, { params: params }] : null,
    fetcher || defaultFetcher,
    swrOpts
  )

  return {
    data: data,
    isLoading: deps && !error && !data,
    isError: error,
    mutate,
  }
}

export default useFetchV3
