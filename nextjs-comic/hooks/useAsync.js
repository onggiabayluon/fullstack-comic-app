import { useCallback, useEffect, useState } from 'react'

// Exucute immedialy
export function useAsync(func, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true)

  useEffect(() => {
    execute()
  }, [execute])

  return state
}

// Execute only when using await or then()
export function useAsyncFn(func, dependencies = []) {
  return useAsyncInternal(func, dependencies, false)
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState(null)
  const [value, setValue] = useState()

  const execute = useCallback((...params) => {
    setLoading(true)
    return func(...params)
      .then((data) => {
        setValue(data)
        setError(undefined)
        return data
      })
      .catch((error) => {
        setError(error)
        setValue(undefined)
        return Promise.reject(error)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { loading, error, setError, value, execute }
}
