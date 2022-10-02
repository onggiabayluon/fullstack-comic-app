function LineSkeleton({ className = '', width = 32, height = 32 }) {
  return (
    <div
      role="status"
      className={className + ' ' + 'animate-pulse rounded-full'}
      style={{ width: width + 'px', height: height + 'px' }}
    >
      <div
        style={{ width: width + 'px', height: height + 'px' }}
        className="mb-4 rounded-full bg-gray-200 dark:bg-gray-700"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

function LineSkeletonPack() {
  return (
    <div className="flex flex-col space-y-1">
      <LineSkeleton width={100} height={6} />
      <LineSkeleton width={40} height={4} />
      <LineSkeleton width={50} height={4} />
    </div>
  )
}

export default LineSkeleton
