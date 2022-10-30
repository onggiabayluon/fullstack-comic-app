import Container from '@/components/common/Container'
import Image from '@/components/common/Image'
import CustomLink from '@/components/common/Link'
import CommentSection from '@/components/Section/CommentSection'
import { PageSEO } from '@/components/SEO'
import { chapterDetailMetaData } from '@/data/siteMetadata'
import chapterToJSON from '@/lib/toJSON/chapterToJSON'
import chapterSLugify from '@/lib/utils/chapterSlugify'
import classNames from '@/lib/utils/classNames'
import { layouts } from '@/lib/utils/getLayout'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { getChapterDetail, getChapters, incChapterViews } from '@/services/comicService'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { FaCaretUp } from 'react-icons/fa'

export async function getStaticProps({ params }) {
  const { comicSlug, chapterSlug } = params
  const staticChapter = chapterToJSON(await getChapterDetail(comicSlug, chapterSlug))

  if (!staticChapter) {
    return {
      notFound: true,
    }
  }

  return {
    props: { staticChapter, comicSlug, chapterSlug },
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_IN_1_HOUR),
  }
}

// If a page has Dynamic Routes and uses getStaticProps,
// it needs to define a list of paths to be statically generated.
export async function getStaticPaths() {
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const chapters = await getChapters()

  const paths = chapters.map((chapter) => {
    const { comic_slug: comicSlug, slug: chapterSlug } = chapter
    return {
      params: { comicSlug, chapterSlug },
    }
  })
  return {
    paths,
    fallback: 'blocking', // fallback to server-side-rendering if a page not rendered yet
  }
}

function ChapterDetail({ staticChapter: chapter, comicSlug, chapterSlug }) {
  // const { comic: chapter, getPrevChapter, getNextChapter } = useComic(staticChapter)
  const getPrevChapter = (chapter) => {
    const hasPrevChapter = chapter?.chapter_num - 1 === 0 ? false : true
    return hasPrevChapter ? chapter?.chapter_num - 1 : null
  }
  const getNextChapter = (chapter) => {
    return chapter?.chapter_num + 1
  }

  const chap = {
    ...chapter,
    comicSlug: comicSlug,
  }

  useEffect(function incView() {
    incChapterViews(comicSlug, chapterSlug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageSEO
        title={chapterDetailMetaData.title(chap.comic_title)}
        description={chapterDetailMetaData.description}
      />
      <Container className="mt-4">
        <ChapterCard
          {...chap}
          id="PrevChapter"
          dynamicChapterSlug={chapterSLugify(getPrevChapter(chapter))}
          dynamicChapterNum={getPrevChapter(chapter)}
        />
        <ImageList className="relative my-8" images={chap.images} comicTitle={chap.comic_title} />
        <ChapterCard
          {...chap}
          id="NextChapter"
          dynamicChapterSlug={chapterSLugify(getNextChapter(chapter))}
          dynamicChapterNum={getNextChapter(chapter)}
        />
        <CommentSection className="mt-10 flex-[100%]" comicSlug={comicSlug} />
      </Container>

      <ScrollToTopButton />
    </>
  )
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <Transition
      show={isVisible}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        onClick={scrollToTop}
        className={classNames(
          // isVisible ? 'opacity-100' : 'opacity-0',
          'group fixed right-4 bottom-8 h-8 w-8 cursor-pointer rounded-full bg-dark-gray-darker transition-all duration-700 ease-out dark:bg-dark-blue-light sm:right-8'
        )}
      >
        <span className="flex h-full w-full items-center justify-center">
          <FaCaretUp className="h-5 w-5 fill-dark-blue-lighter group-hover:fill-dark-blue dark:group-hover:fill-dark-green-darker" />
        </span>
      </div>
    </Transition>
  )
}
function ImageList({ images, comicTitle, className }) {
  return images?.length > 0 ? (
    <ul className={className}>
      {images.map((item, index) => (
        <ImageCard key={item.id} {...item} comicTitle={comicTitle} />
      ))}
    </ul>
  ) : null
}

function ImageCard({ src, comicTitle }) {
  // const [paddingTop, setPaddingTop] = useState('0')
  const [width, setWidth] = useState('0')
  const [height, setHeight] = useState('0')

  return (
    <li
      // style={{ paddingTop }}
      className="relative flex justify-center"
    >
      <Image
        alt={comicTitle}
        src={src}
        width={width}
        height={height}
        layout="intrinsic"
        objectFit="cover"
        onLoad={({ target }) => {
          const { naturalWidth, naturalHeight } = target
          setWidth(naturalWidth)
          setHeight(naturalHeight)
          // setPaddingTop(`calc((${naturalHeight} / ${naturalWidth}) * 100% )`)
        }}
        unoptimized
      />
    </li>
  )
}

function ChapterCard(props) {
  const { comic_title: comicTitle, comicSlug, dynamicChapterSlug, dynamicChapterNum } = props
  return dynamicChapterSlug ? (
    <div className="mx-auto max-w-md space-y-4">
      <CustomLink
        className="group color-card-hover color-border-primary color-card block rounded-lg border p-6 shadow-md"
        href={publicRoutes.chapterDetail.getDynamicPath(comicSlug, dynamicChapterSlug)}
      >
        <article className="flex flex-row items-center">
          <div className="flex h-full flex-col">
            <h2 className="color-text-primary color-text-primary-group-hover text-base font-semibold capitalize line-clamp-1">
              {comicTitle}
            </h2>
            <span className="color-text-primary color-text-primary-group-hover pt-4 text-sm font-semibold capitalize underline line-clamp-1">
              {`Chapter ${dynamicChapterNum}`}
            </span>
          </div>
          <span className="color-text-primary color-text-primary-group-hover ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </article>
      </CustomLink>
    </div>
  ) : null
}

ChapterDetail.layout = layouts.chapterDetail.layout
export default ChapterDetail
