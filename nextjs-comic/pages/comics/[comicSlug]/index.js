import Container from '@/components/Container'
import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import CommentSection from '@/components/Section/CommentSection'
import { PageSEO } from '@/components/SEO'
import TagList from '@/components/Tag/TagList'
import { comicDetailMetaData } from '@/data/siteMetadata'
import useComic from '@/hooks/useComic'
import comicsToJSON from '@/lib/toJSON/comicsToJSON'
import classNames from '@/lib/utils/classNames'
import { formatTimeAgo } from '@/lib/utils/dateFormatter'
import { layouts } from '@/lib/utils/getLayout'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { getComicBySlug, getComics } from '@/services/comicService'
import { useEffect, useState } from 'react'

export async function getStaticProps({ params }) {
  const { comicSlug } = params
  const staticComic = comicsToJSON(await getComicBySlug(comicSlug, {}))

  return {
    props: { staticComic, comicSlug },
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_IN_1_HOUR),
  }
}

// If a page has Dynamic Routes and uses getStaticProps,
// it needs to define a list of paths to be statically generated.
export async function getStaticPaths() {
  const comics = (await getComics({ params: { type: 'less' } })).results

  const paths = comics.map((comic) => {
    const { slug: comicSlug } = comic
    return {
      params: { comicSlug },
    }
  })
  return {
    paths,
    fallback: 'blocking', // fallback to server-side-rendering if a page not rendered yet
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { comicSlug: 'omniscient-readers-viewpoint' } }],
//     fallback: true,
//   }
// }

export default function ComicDetail({ staticComic, comicSlug }) {
  const { comic, getTotalViews } = useComic(staticComic)

  const getFirstChapter = () => {
    return comic?.chapters?.length ? comic.chapters[comic.chapters.length - 1] : null
  }

  const { src, title, categories: tags, chapters, author, description } = comic
  useEffect(() => {
    console.log('comic detail re render')
  })

  return (
    <>
      <PageSEO
        title={comicDetailMetaData.title(title)}
        description={comicDetailMetaData.description}
      />
      {/* Wrapper */}
      <div>
        <div className="banner-height relative">
          <Banner src={src} title={title} />
          <Info tags={tags} title={title} author={author} />
        </div>
        <Container>
          <div className="relative -top-16 z-50 flex flex-wrap gap-4 sm:gap-2 lg:gap-3">
            <DetailList
              className="comic-detail-section-styles comic-detail-detail-list-height color-bg-secondary order-2 max-h-[570px] flex-[60%] overflow-y-auto p-2  sm:p-8 lg:order-1"
              chapters={chapters}
              src={src}
              title={title}
              comicSlug={comic.slug}
            />
            <AsideDetail
              className="comic-detail-section-styles color-bg-secondary order-1 flex-[30%] space-y-5 p-8  lg:order-2"
              description={description}
              firstChapterhref={publicRoutes.chapterDetail.getDynamicPath(
                comic.slug,
                getFirstChapter()?.slug
              )}
              views={getTotalViews()}
            />
            <CommentSection className="order-3 mt-5 flex-[100%] lg:order-3" comicSlug={comicSlug} />
          </div>
        </Container>
      </div>
    </>
  )
}
function DetailList({ chapters, comicSlug, src, title, views, className }) {
  const [query, setQuery] = useState('')
  const keys = ['slug']
  const filter = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    )
  }
  const filteredChapters = filter(chapters)
  return (
    <div className={className}>
      <h2 className="mb-4 text-center font-medium">{title}</h2>
      <form className="mt-4 mb-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            id="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>
      <ul>
        {filteredChapters.map((chapter, index) => (
          <li
            key={chapter.slug}
            className={classNames(
              index == chapters.length - 1 && 'border-b',
              'border-t dark:border-gray-700'
            )}
          >
            <CustomLink
              className="flex items-center space-x-3 pr-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              href={publicRoutes.chapterDetail.getDynamicPath(comicSlug, chapter.slug)}
            >
              <Image
                alt={title}
                src={src}
                className="object-cover object-center"
                width={77}
                height={77}
              />
              <span className="text-xs sm:text-sm md:text-base">Chapter {chapter.chapter_num}</span>
              <span className="!ml-auto text-xs font-light sm:text-sm">
                {formatTimeAgo(chapter.updated_date)}
              </span>
              <span className="flex items-center text-sm font-light">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span aria-label={views ? `${views}  views` : '0 views'} className="ml-1">
                  {chapter.views || 0}
                </span>
              </span>
              <span className="text-sm sm:text-base"># {index + 1}</span>
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AsideDetail({ description, className, firstChapterhref, views }) {
  return (
    <aside className={className}>
      <ul className="flex flex-row justify-center space-x-2 lg:justify-start">
        <li className="flex items-center space-x-2">
          <span className="text-primary">
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <span
            className="text-sm font-normal"
            aria-label={views ? `${views} Total views` : '0 Total views'}
          >
            {views || 0}
          </span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </span>
          <span className="text-sm font-normal">1.1M</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
          <span className="text-sm font-normal">1.1M</span>
        </li>
        <button
          type="button"
          className=" rounded-lg bg-primary-700 px-2 py-1 text-sm font-light text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Rate
        </button>
      </ul>
      <p className="text-white-dark lg:text-white-dark prose-sm lg:prose">{description}</p>
      <CustomLink href={firstChapterhref} className="block">
        <button
          type="button"
          className="text-md flex w-full items-center rounded-full bg-primary-700 p-2.5 text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <span className="mx-auto">First Chapter</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="stroke-3 h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </button>
      </CustomLink>
    </aside>
  )
}

function Banner({ src, title }) {
  return (
    <div className="banner-height absolute z-0 w-full">
      <Image
        width="100%"
        height={321}
        alt={title}
        src={src}
        className="object-cover object-center"
        layout="fill"
      />
    </div>
  )
}

function Info({ tags, title, author }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <TagList tags={tags} />
      <h2 className="text-title tracking-wide text-white">{title}</h2>
      <div className="text-base text-white underline ">
        <a href="#">{author}</a>
      </div>
    </div>
  )
}

ComicDetail.layout = layouts.comicDetail.layout
