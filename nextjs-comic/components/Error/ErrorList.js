import objToArray from '@/lib/utils/objToArray'
import Error from './Error'

function ErrorList({ errors = {} }) {
  if (errors instanceof Object) errors = objToArray(errors)
  if (!(errors instanceof Object) && errors) errors = [{ message: errors }]

  return errors?.length ? (
    <ul className="max-w-md list-inside space-y-1 text-gray-500 dark:text-gray-400">
      {errors.map((error, index) => (
        <Error key={index} error={error} />
      ))}
    </ul>
  ) : null
}

export default ErrorList
