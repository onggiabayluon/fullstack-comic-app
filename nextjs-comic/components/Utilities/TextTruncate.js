import { useCallback, useState } from 'react'
function TextTruncate({ text, heightLimit = 10, className }) {
  const [shouldTruncate, setShouldTruncate] = useState(false)
  const [readMore, setReadMore] = useState(false)

  // Measure the element to calculate the number of lines and
  // determine whether to truncate
  const measuredRef = useCallback(
    (node) => {
      // Before the component mounts the node ref will be null
      if (node?.parentElement) {
        // Calculate the number of lines based on height
        const elHeight = node.offsetHeight
        const styles = window.getComputedStyle(node)
        const lineHeight = styles.getPropertyValue('line-height').replace('px', '')
        const elLineCount = elHeight / parseInt(lineHeight, 10)

        setShouldTruncate(elLineCount > heightLimit)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text]
  )

  const shouldClamp = shouldTruncate && !readMore

  // Our toggle for expanding or hiding truncated text
  const classes =
    'prose-sm lg-prose mt-2 cursor-pointer text-dark-gray-darker hover:text-dark-gray-dark'
  let toggle
  if (readMore) {
    toggle = (
      <span className={classes} onClick={() => setReadMore(false)}>
        Show less
      </span>
    )
  } else {
    toggle = (
      <span className={classes} onClick={() => setReadMore(true)}>
        Read more
      </span>
    )
  }

  return (
    <>
      <div className={className}>
        <p ref={measuredRef} className={`${shouldClamp ? 'line-clamp-10' : 'line-clamp-none'}`}>
          {text}
        </p>
      </div>
      {shouldTruncate && toggle}
    </>
  )
}

export default TextTruncate
