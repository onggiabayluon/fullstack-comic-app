import CardList from '@/components/Card/CardList'
import LongSlimCard from '@/components/Card/LongSlimCard'
import HomeCarousel from '@/components/Carousel/CarouselSlider'
import Container from '@/components/common/Container'
import CustomLink from '@/components/common/Link'
import Pagination from '@/components/common/Pagination'
import PictureTextSkeleton from '@/components/Skeleton/PictureTextSkeleton'
import constant from '@/data/constants'
import headerNavLinks from '@/data/headerNavLinks'
import usePaginatedQuery from '@/hooks/usePaginatedQuery'
import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import classNames from '@/lib/utils/classNames'
import { getComics } from '@/services/comicService'
import { PageSEO } from 'components/SEO'
import { siteMetadata } from 'data/siteMetadata'
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getStaticProps() {
  const LIMIT = 10

  const [recommendComics, lastestComic] = await Promise.all([
    getComics({ type: 'less', limit: LIMIT }),
    getComics({ type: 'less', limit: LIMIT }),
  ])

  return {
    props: { recommendComics, lastestComic },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 minutes
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_IN_1_HOUR),
  }
}

export default function Home(props) {
  return (
    <Container className="overflow-hidden">
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex flex-row space-x-0 xl:space-x-10">
        <Sidebar />
        <div className="flex-1">
          <RecommendSection initialComics={comicsToJSON(props.recommendComics.results)} />
          <LastestUpdateSection
            initialComics={comicsToJSON(props.lastestComic.results)}
            totalRecords={props.lastestComic.count}
          />
        </div>
      </div>
    </Container>
  )
}

function LastestUpdateSection({ initialComics, totalRecords }) {
  const pageSize = constant.COMIC_LIMIT
  const options = { type: 'less' }
  const [lastestComic, setLastestComic] = useState(initialComics)
  const { currentPage, setCurrentPage, loading, error } = usePaginatedQuery(
    setLastestComic,
    getComics,
    null,
    options,
    comicsToJSON
  )

  return (
    <>
      <section className="min-h-[1066px] sm:min-h-[596px]" aria-label="Lastest Update Section">
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-xl md:leading-14">
            Lastest Update
          </h1>
        </div>

        <div className="w-full" aria-label="Lastest Update container">
          {loading || lastestComic?.length == 0 ? (
            <div className="flex flex-row flex-wrap justify-between">
              {Array(pageSize)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className={classNames(
                      (index == 1 && 'md:border-t-2') || (index == 0 && 'border-t-2'),
                      'border-gray flex w-full items-center space-x-3 self-center border-b-2 p-2 last-of-type:ml-auto md:w-[49%]'
                    )}
                  >
                    <PictureTextSkeleton error={error && true} height={80} />
                  </div>
                ))}
            </div>
          ) : (
            <CardList
              className="flex flex-row flex-wrap justify-between "
              CardComp={LongSlimCard}
              items={lastestComic}
              limit={pageSize}
            />
          )}
        </div>
      </section>
      <Pagination
        className="pagination-bar mt-4"
        currentPage={currentPage}
        totalCount={totalRecords}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        isLoading={loading}
      />
    </>
  )
}

function RecommendSection({ initialComics }) {
  const [recommendComics, setRecommendComics] = useState(initialComics)

  return (
    <section className="min-h-[476px] sm:min-h-[496px]" aria-label="Recommends Section">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-2xl md:leading-14">
          Recommends
        </h1>
      </div>

      <div
        className="max-w-[94vw] xl:max-w-[calc(100vw-360px)]"
        // className="max-w-[94vw] xl:max-w-[990px] 2xl:max-w-[calc(100vw-360px)]"
        aria-label="Carousel container"
      >
        <HomeCarousel comics={recommendComics} />
      </div>
    </section>
  )
}

function Sidebar() {
  return (
    <aside
      className="border-theme left-0 mt-2 hidden h-screen min-w-[15rem] border-r xl:block"
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
