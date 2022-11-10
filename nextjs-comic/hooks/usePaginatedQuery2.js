import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import useFetchV3 from './api/useFetchV3'

/**
 *
 * @param {function} getDataFn function lấy data từ services
 * @param {object} passedArgs args cho function getDataFn
 * @param {array || null} initialDatas dữ liệu ban đầu
 * @returns {data, currentPage, setCurrentPage, isLoading, isError}
 */
function usePaginatedQuery2(getDataFn, passedArgs, initialDatas) {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(initialDatas)

  // Use initital data when its exist and current page is 1
  const shouldUseInitialData = !!initialDatas && currentPage === 1
  // Only fetch when not use initial data
  const shouldFetch = !shouldUseInitialData

  // set new initialData and page to default when go to another detail pages
  useUpdateEffect(() => {
    setData(initialDatas)
    setCurrentPage(1)
  }, [initialDatas])

  const wrap = (oldFunction) => {
    // return a new function that will call the oldFunction
    // with all of the arguments passed to it
    return (...args) => {
      // call the old function with all of the arguments
      return oldFunction(...args)
    }
  }
  // create the newly wrapped add function
  const newGetDataFn = wrap(getDataFn)

  // Pass extra params {page: currentPage} to old function
  const func = newGetDataFn({ page: currentPage, ...passedArgs })

  // Chỉ fetch khi currentPage change và đã mounted
  const { data: res, isLoading, isError } = useFetchV3({ func, deps: shouldFetch })

  useUpdateEffect(() => {
    setData(res?.results)
  }, [res?.results])

  return {
    data: shouldUseInitialData ? initialDatas : data,
    currentPage,
    setCurrentPage,
    isLoading: isLoading,
    isError,
  }
}

export default usePaginatedQuery2
