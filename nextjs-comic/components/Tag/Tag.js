import { publicRoutes } from '@/lib/utils/getRoutes'
import kebabCase from 'lib/utils/kebabCase'
import Link from 'next/link'

const Tag = ({ text }) => {
  return (
    <Link href={publicRoutes.categories.getDynamicPath(kebabCase(text))}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
