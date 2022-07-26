import { useCallback, useEffect, useState } from 'react'

function useStorage(key, defaultValue, storageObject) {
  const isBrowser = (() => typeof window !== 'undefined')()
  storageObject = isBrowser && window.localStorage

  const [value, setValue] = useState(() => {
    const jsonValue = isBrowser && storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === 'function') {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return isBrowser && storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject, isBrowser])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}

export default useStorage
