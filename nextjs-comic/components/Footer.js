import classNames from '@/lib/utils/classNames'
import { publicRoutes } from '@/lib/utils/getRoutes'
import SocialIcon from 'components/social-icons'
import { siteMetadata } from 'data/siteMetadata'
import { useRouter } from 'next/router'
import Link from './Link'

export default function Footer() {
  const router = useRouter()

  return (
    <footer
      className={classNames(
        router.pathname == (publicRoutes.comicDetail.path || publicRoutes.chapterDetail.path)
          ? 'color-bg-primary'
          : '',
        'min-h-[160px]'
      )}
    >
      <div className="flex flex-col items-center pt-16">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
