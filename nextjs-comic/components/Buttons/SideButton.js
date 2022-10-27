import classNames from '@/lib/utils/classNames'
import PictureGroupSkeleton from '../Skeleton/PictureGroupSkeleton'

export default function SideButton({ isLoading, isActive, title, Icon, className, onBtnClick }) {
  return isLoading ? (
    <PictureGroupSkeleton
      className="border-2 border-transparent pr-6 first:mt-2"
      height={55}
      hasIcon={false}
    />
  ) : (
    <>
      <button
        type="button"
        onClick={onBtnClick}
        className={classNames(
          className,
          'group -md relative w-full border border-gray-300 bg-white px-3 py-3 text-sm font-medium leading-4 shadow-sm hover:bg-gray-50 focus:outline-none lg:w-[90%] '
        )}
      >
        <span
          className={classNames(
            isActive && '!opacity-100',
            'inline-flex flex-grow items-center justify-center opacity-50 group-hover:opacity-100'
          )}
        >
          <span
            className={classNames(
              isActive && '!border-l-4 !opacity-100',
              'absolute left-0 h-full border-l-0 border-indigo-400 transition-[border] group-hover:border-l-4'
            )}
          ></span>
          {Icon && <Icon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />}
          <span
            className={classNames(
              isActive && '!mr-0',
              'mr-2 mt-1 text-xs uppercase transition-[margin] group-hover:mr-0'
            )}
          >
            {title}
          </span>
        </span>
      </button>
    </>
  )
}
