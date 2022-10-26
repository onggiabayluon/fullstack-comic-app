import { makeRequest } from '@/lib/utils/httpRequest'
// import { useEffect, useState } from 'react'
import useSWR from 'swr'

const defaultFnc = () => {}

const TEN_SECONDS = 10000
const swrOpts = {
  dedupingInterval: TEN_SECONDS,
  revalidateOnFocus: false, //automatically revalidate when window gets focused (details)
  revalidateOnReconnect: false, // automatically revalidate when the browser regains a network connection
}
const defaultFetcher = makeRequest

function useFetch({ url, options, deps = true, fetcher = defaultFetcher }) {
  const { data, error } = useSWR(deps ? [url, options] : null, fetcher, swrOpts)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFetch
