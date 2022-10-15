import classNames from '@/lib/utils/classNames'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { useRouter } from 'next/router'

function Body({ children }) {
  const router = useRouter()

  return (
    <main
      className={classNames(
        router.pathname == publicRoutes.comicDetail.path ? 'color-bg-comic-detail' : ''
      )}
    >
      {children}
    </main>
  )
}

export default Body
