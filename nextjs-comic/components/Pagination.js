import { DOTS, usePagination } from '@/hooks/usePagination'
import classNames from '@/lib/utils/classNames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  // Normalize the value by bringing it within the range.
  // If value is greater than max, max will be returned.
  // If value is less than min, min will be returned.
  // Otherwise, value is returned unaltered. Both ends of this range are inclusive.
  const limit = (value, min, max) => {
    return Math.max(min, Math.min(max, value))
  }
  const totalRecords = totalCount
  const pageRecords = useMemo(() => {
    return {
      from: limit((currentPage - 1) * pageSize + 1, 1, totalRecords),
      to: limit((currentPage - 1) * pageSize + pageSize, 1, totalRecords),
    }
  }, [currentPage, pageSize, totalRecords])

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div
      className={classNames(
        className,
        'border-theme color-bg-primary flex items-center justify-between border-t px-4 py-3 sm:px-6'
      )}
    >
      {/* <div className="flex flex-1 justify-between sm:hidden">
        <button
          role="button"
          onClick={onPrevious}
          className={classNames(
            currentPage === 1 && 'disabled',
            'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          )}
        >
          Previous
        </button>
        <button
          role="button"
          className={classNames(
            currentPage === lastPage && 'disabled',
            'relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          )}
          onClick={onNext}
        >
          Next
        </button>
      </div> */}

      {/* Tablet Nav */}
      <div className="flex flex-1 flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div>
          <p className="color-text-gray text-sm">
            Showing <span className="font-medium">{pageRecords.from}</span> to{' '}
            <span className="font-medium">{pageRecords.to}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Prev Button */}
            <button
              role="button"
              onClick={onPrevious}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Pagination Range */}
            <PaginationList range={paginationRange} />

            {/* Next Button */}
            <button
              role="button"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={onNext}
              disabled={currentPage === lastPage}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )

  function PaginationList({ range }) {
    return range.map((pageNumber) => {
      if (pageNumber === DOTS) {
        return (
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            &#8230;
          </span>
        )
      }
      return (
        <button
          role="button"
          key={pageNumber}
          aria-current="page"
          className={classNames(
            pageNumber === currentPage
              ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
              : 'border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 ',
            'relative z-10 inline-flex cursor-pointer items-center border  px-4 py-2 text-sm font-medium  focus:z-20'
          )}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      )
    })
  }
}

export default Pagination
