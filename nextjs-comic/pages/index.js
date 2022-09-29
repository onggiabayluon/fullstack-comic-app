import HomeCarousel from '@/components/Carousel/CarouselSlider'
import Container from '@/components/Container'
import { PageSEO } from 'components/SEO'
import siteMetadata from 'data/siteMetadata'

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
        <aside
          className="border-gray left-0 mt-2 hidden h-screen min-w-[15rem] border-r xl:block"
          aria-label="Side Bar"
        >
          <div className="divide-gray mt-5 max-w-[80%] divide-y">
            <h2 className="text-muted mb-3 text-sm">Menu</h2>
            <ul className="space-y-2 pt-3" aria-label="Sidebar Menu">
              {/* {headerNavLinks.map((link) => (
              <CustomLink
                key={link.title}
                href={link.href}
                className="text-sm font-medium  hover:text-primary-500  dark:hover:text-primary-400"
              >
                {link.title}
              </CustomLink> */}
              <li className="text-primary-active bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md p-2">
                <span className="flex h-7 w-7 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                </span>
                <h3 className="text-base font-medium">Dashboard</h3>
              </li>
              <li className="bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md p-2">
                <span className="flex h-7 w-7 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </span>
                <h3 className="text-base font-medium">Bookmark</h3>
              </li>
              <li className="bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md p-2">
                <span className="flex h-7 w-7 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <h3 className="text-base font-medium">History</h3>
              </li>
              <li className="bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md p-2">
                <span className="flex h-7 w-7 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                </span>
                <h3 className="text-base font-medium">Tag</h3>
              </li>
            </ul>
          </div>
        </aside>
        <section aria-label="Recommends Section">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-2xl md:leading-14">
              Recommends
            </h1>
          </div>

          <div
            className="max-w-[94vw] xl:max-w-[990px] 2xl:max-w-[80vw]"
            aria-label="Carousel container"
          >
            <HomeCarousel />
          </div>
        </section>
      </div>
    </Container>
  )
}
