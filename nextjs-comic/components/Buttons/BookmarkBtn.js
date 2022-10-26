import classNames from '@/lib/utils/classNames'
import { BookmarkIcon } from '@heroicons/react/20/solid'
import Spinner from '../Skeleton/Spinner'

function BookmarkBtn({
  isLoading,
  onBtnClick,
  isDisabled,
  Skeleton,
  isSubmitting,
  isBookmarked,
  bookmarkCount,
}) {
  return !isLoading ? (
    <span className="relative z-0 inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={onBtnClick}
        disabled={isDisabled}
        className="color-text-primary comic-detail-section-styles relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:hover:bg-dark-blue-darker"
      >
        {/* Spinner icon when submitting */}
        {isSubmitting ? (
          <Spinner className="-ml-1 mr-2 h-5 w-5" />
        ) : (
          <BookmarkIcon
            className={classNames(
              isBookmarked
                ? 'fill-slate-800 dark:fill-slate-100'
                : 'fill-transparent stroke-slate-900',
              '-ml-1 mr-2 h-5 w-5'
            )}
            aria-hidden="true"
          />
        )}
        {isBookmarked ? 'Subscribed' : 'Subscribe'}
      </button>
      <button
        type="button"
        className="color-text-primary comic-detail-section-styles relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {bookmarkCount}
      </button>
    </span>
  ) : (
    Skeleton
  )
}

export default BookmarkBtn
