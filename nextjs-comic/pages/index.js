import HomeCarousel from '@/components/Carousel/CarouselSlider'
import Container from '@/components/Container'
import CustomLink from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'
import classNames from '@/lib/utils/classNames'
import { PageSEO } from 'components/SEO'
import siteMetadata from 'data/siteMetadata'
import { useRouter } from 'next/router'

// const MAX_DISPLAY = 5;

// export async function getStaticProps() {
//   const posts = await getAllFilesFrontMatter('blog')

//   return { props: { posts } }
// }

export default function Home() {
  return (
    <Container>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex flex-row space-x-0 xl:space-x-10">
        <Sidebar />
        <RecommendsSection />
      </div>
    </Container>
  )
}

function RecommendsSection() {
  return (
    <section aria-label="Recommends Section">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-2xl md:leading-14">
          Recommends
        </h1>
      </div>

      <div
        className="max-w-[94vw] xl:max-w-[990px] 2xl:max-w-[calc(100vw-360px)]"
        aria-label="Carousel container"
      >
        <HomeCarousel />
      </div>
    </section>
  )
}

function Sidebar() {
  return (
    <aside
      className="border-gray left-0 mt-2 hidden h-screen min-w-[15rem] border-r xl:block"
      aria-label="Side Bar"
    >
      <div className="divide-gray mt-5 max-w-[80%] divide-y">
        <h2 className="text-muted mb-3 text-sm">Menu</h2>
        <NavList links={headerNavLinks} />
      </div>
    </aside>
  )
}

function NavList({ links }) {
  return links?.length > 0 ? (
    <ul className="space-y-2 pt-3" aria-label="Sidebar Menu">
      {links.map((link) => (
        <NavLink key={link.title} href={link.href} title={link.title} icon={link.icon} />
      ))}
    </ul>
  ) : null
}

function NavLink({ href, title, icon }) {
  const router = useRouter()
  return (
    <li>
      <CustomLink
        href={href}
        className={classNames(
          router.pathname == href ? 'text-primary-active' : '',
          'bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md p-2'
        )}
      >
        <span className="flex h-7 w-7 justify-center">{icon}</span>
        <h3 className="text-base font-medium">{title}</h3>
      </CustomLink>
    </li>
  )
}
