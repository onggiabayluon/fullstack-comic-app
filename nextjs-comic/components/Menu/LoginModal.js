import Logo from '@/data/logo.svg'
import { useLogin } from '@/hooks/useLogin'
import classNames from '@/lib/utils/classNames'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'
import ErrorList from '../Error/ErrorList'

function LoginModal({ onCloseBtnClick }) {
  const { loginUser, error: loginErr, loading: isLoading } = useLogin()

  const {
    register,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  })

  const isDisabled = isLoading || !isDirty || !isValid

  const submitForm = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { username, password } = Object.fromEntries(formData) // convert the FormData object to a JSON object

    loginUser(username, password, onCloseBtnClick)
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="mx-auto flex h-10 w-10">
              <Logo />
            </span>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username-address" className="sr-only">
                  Username
                </label>
                <input
                  {...register('username', {
                    required: { value: true, message: 'username is required' },
                  })}
                  id="username-address"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register('password', {
                    minLength: { value: 6, message: 'password is too short (min: 6)' },
                    required: { value: true, message: 'password is required' },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <ErrorList errors={errors} />
              <ErrorList errors={loginErr} />
            </div>

            <div>
              <button
                disabled={isDisabled}
                type="submit"
                className={classNames(
                  isDisabled
                    ? 'cursor-not-allowed rounded-lg bg-blue-400 px-5 py-2.5 text-center text-sm font-medium text-white dark:bg-blue-500 '
                    : 'bg-indigo-600  text-white hover:bg-indigo-700 ',
                  'group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                {isLoading && (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="mr-3 inline h-4 w-4 animate-spin text-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </>
                )}
                {!isLoading && (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginModal
