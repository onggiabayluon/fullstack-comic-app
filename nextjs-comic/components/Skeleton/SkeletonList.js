function SkeletonList({ Component, height, pageSize, isError, className, ...props }) {
  return Array(pageSize)
    .fill()
    .map((_, index) => (
      <Component key={index} error={isError} height={height} className={className} {...props} />
    ))
}

export default SkeletonList
