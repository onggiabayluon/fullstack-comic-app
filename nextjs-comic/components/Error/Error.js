function Error({ error }) {
  let { message } = error
  // if error is array of text then set message to error
  if (error?.length) message = error
  return (
    <li className="mt-1 flex">
      <svg
        className="mr-1.5 h-4 w-4 flex-shrink-0 text-rose-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="line-clamp-3 text-clip text-sm text-rose-500">{message}</span>
    </li>
  )
}

export default Error
