import { useAuthState } from '@/hooks/useAuthState'
import Banner from './Banner'
import Container from './Container'

// Component's children only shown to logged-in users
export default function AuthCheck({ children, showDefaultFallback = false, fallback = null }) {
  const { user } = useAuthState()
  return user ? (
    children
  ) : showDefaultFallback ? (
    <Container className="mt-7">
      <Banner
        title="Authentication Required"
        description="You must sign in to view this content."
      />
    </Container>
  ) : (
    fallback
  )
}
