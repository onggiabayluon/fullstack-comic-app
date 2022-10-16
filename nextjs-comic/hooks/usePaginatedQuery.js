import { useAsyncFn } from '@/hooks/useAsync'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
const usePaginatedQuery = (setData, queryFn, queryParams, queryOptions, toJsonFn) => {
  const [currentPage, setCurrentPage] = useState(1)
  const controller = new AbortController()
  const signal = controller.signal

  const params = { page: currentPage, ...queryOptions }
  const args = queryParams ? { ...queryParams, params, signal } : { params, signal }

  const { execute: fetchMoreFn, loading, setLoading, error } = useAsyncFn(queryFn)
  const executeFetch = () => {
    return fetchMoreFn({ ...args })
      .then((response) => {
        setData(toJsonFn ? toJsonFn(response.results) : response.results)
      })
      .catch((err) => {
        if (err.code === 'ERR_CANCELED') setLoading(true)
      })
  }

  // Fetch new page whenever currentPage change (when clicking pagination)
  useUpdateEffect(() => {
    executeFetch()

    return () => controller.abort()
  }, [currentPage])

  return { setData, currentPage, setCurrentPage, loading, error }
}

export default usePaginatedQuery
