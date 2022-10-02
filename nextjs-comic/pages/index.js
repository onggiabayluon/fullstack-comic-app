import CardList from '@/components/Card/CardList'
import LongSlimCard from '@/components/Card/LongSlimCard'
import HomeCarousel from '@/components/Carousel/CarouselSlider'
import Container from '@/components/Container'
import CustomLink from '@/components/Link'
import PictureTextSkeleton from '@/components/Skeleton/PictureTextSkeleton'
import headerNavLinks from '@/data/headerNavLinks'
import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import classNames from '@/lib/utils/classNames'
import { getComics } from '@/services/comicService'
import { PageSEO } from 'components/SEO'
import siteMetadata from 'data/siteMetadata'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
        <div>
          <RecommendSection />
          <LastestUpdateSection />
        </div>
      </div>
    </Container>
  )
}

function LastestUpdateSection() {
  const [comics, setComics] = useState([])
  const [error, setError] = useState(false)
  const LIMIT = 10

  useEffect(() => {
    getComics({ type: 'less', limit: LIMIT })
      .then((res) => setComics(comicsToJSON(res.results)))
      .catch((err) => setError(true))
  }, [])

  return (
    <section aria-label="Lastest Update Section">
      <div className="space-y-2 pt-6 pb-6 md:space-y-5">
        <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-xl md:leading-14">
          Lastest Update
        </h1>
      </div>

      <div className="w-full" aria-label="Lastest Update container">
        {comics.length == 0 ? (
          <div className="flex flex-row flex-wrap justify-between">
            {Array(LIMIT)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    (index == 1 && 'md:border-t-2') || (index == 0 && 'border-t-2'),
                    'border-gray flex w-full items-center space-x-3 self-center border-b-2 p-2 last-of-type:ml-auto md:w-[49%]'
                  )}
                >
                  <PictureTextSkeleton error={error} height={80} />
                </div>
              ))}
          </div>
        ) : (
          <CardList
            className="flex flex-row flex-wrap justify-between "
            CardComp={LongSlimCard}
            items={comics}
          />
        )}
      </div>
    </section>
  )
}

function RecommendSection() {
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
