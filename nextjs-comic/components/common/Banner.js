import { FaExclamation } from 'react-icons/fa'

function Banner({ title, description }) {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaExclamation className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
