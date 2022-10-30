import { useAuthContext } from '@/hooks/useAuthContext'
import { FaExclamation } from 'react-icons/fa'
import Container from './Container'

// Component's children only shown to logged-in users
export default function AuthCheck({ children, showDefaultFallback = false, fallback = null }) {
  const { state: user } = useAuthContext()
  return user ? (
    children
  ) : showDefaultFallback ? (
    <Container className="mt-7">
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamation className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Authentication Required</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>You must sign in to view this content.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    fallback
  )
}
