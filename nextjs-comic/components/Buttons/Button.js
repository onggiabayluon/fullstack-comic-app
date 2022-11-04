import Spinner from '../Skeleton/Spinner'

function Button({ title, isLoading, isDisabled, ...rest }) {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      className="ml-3 flex items-center justify-center space-x-2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      {...rest}
    >
      {isLoading ? <Spinner /> : title}
    </button>
  )
}

export default Button
