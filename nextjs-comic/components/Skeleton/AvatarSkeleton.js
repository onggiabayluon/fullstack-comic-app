function AvatarSkeleton({ width = 32, height = 32 }) {
  return (
    <div
      role="status"
      className="animate-pulse rounded-full "
      style={{ width: width + 'px', height: height + 'px' }}
    >
      <div>
        <svg
          className="color-text-gray mr-2 h-8 w-8 opacity-80"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default AvatarSkeleton
