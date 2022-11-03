import Container from '@/components/common/Container'
import Image from '@/components/common/Image'
import CustomLink from '@/components/common/Link'
import CommentSection from '@/components/Section/CommentSection'
import { PageSEO } from '@/components/SEO'
import { chapterDetailMetaData } from '@/data/siteMetadata'
import useFetchV2 from '@/hooks/api/useFetchV2'
import { useAuthState } from '@/hooks/useAuthState'
import chapterToJSON from '@/lib/toJSON/chapterToJSON'
import chapterSLugify from '@/lib/utils/chapterSlugify'
import classNames from '@/lib/utils/classNames'
import { layouts } from '@/lib/utils/getLayout'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { getChapterDetail, getChapters, incChapterViews } from '@/services/comicService'
import useUserApi from '@/services/userService'
import { Transition } from '@headlessui/react'
import probe from 'probe-image-size'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCaretUp, FaExclamation } from 'react-icons/fa'

export async function getStaticProps({ params }) {
  try {
    const { comicSlug, chapterSlug } = params
    const staticChapter = chapterToJSON(await getChapterDetail(comicSlug, chapterSlug))

    const imagesWithSizes = await Promise.all(
      staticChapter.images.map(async (image) => {
        const imageWithSize = image
        imageWithSize.size = await probe(image.thumbnail)

        return imageWithSize
      })
    )

    return {
      props: { staticChapter, imagesWithSizes, comicSlug, chapterSlug },
      revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_IN_1_HOUR),
    }
  } catch (error) {
    return {
      notFound: true,
    }
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

function ChapterDetail({ staticChapter: chapter, imagesWithSizes, comicSlug, chapterSlug }) {
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
        title={chapterDetailMetaData.title(chap.comic_title, chapter?.chapter_num + 1)}
        description={chapterDetailMetaData.description}
      />

      <DetailContainer
        chap={chap}
        comicSlug={comicSlug}
        chapterSlug={chapterSlug}
        getPrevChapter={getPrevChapter}
        getNextChapter={getNextChapter}
        imagesWithSizes={imagesWithSizes}
      />

      <ScrollToTopButton />

      <Container>
        <CommentSection className="mt-10 flex-[100%]" comicSlug={comicSlug} />
      </Container>
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

function DetailContainer(props) {
  const [shouldShowImageList, setShouldShowImageList] = useState(true)
  const { user, isUserFetched } = useAuthState()
  const { comicSlug, chapterSlug } = props

  const { checkUserChapterPayment } = useUserApi()
  const { data: paymentState, mutate: paymentMutate } = useFetchV2({
    func: checkUserChapterPayment,
    deps: isUserFetched && !!chapterSlug,
    passProps: { comicSlug, chapterSlug },
  })

  useEffect(() => {
    if (props.chap.price !== 0) {
      // This chapter is not free => check if loggedin
      if (!user) {
        return setShouldShowImageList(false)
      }
      // This chapter is bought by user => show
      if (paymentState?.owned) {
        return setShouldShowImageList(true)
      }
      // This chapter is not bought => no show
      if (!paymentState?.owned) {
        return setShouldShowImageList(false)
      }
    }
    if (props.chap.price === 0) {
      setShouldShowImageList(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserFetched, paymentState])

  return (
    <Container className="mt-4">
      <ChapterCard
        id="PrevChapter"
        shouldShowCard={shouldShowImageList}
        dynamicChapterSlug={chapterSLugify(props.getPrevChapter(props.chap))}
        dynamicChapterNum={props.getPrevChapter(props.chap)}
        {...props.chap}
      />
      <ImageList
        className="relative my-8"
        images={props.chap.images}
        imagesWithSizes={props.imagesWithSizes}
        comicTitle={props.chap.comic_title}
        comicSlug={props.comicSlug}
        chapterSlug={props.chapterSlug}
        shouldShowImageList={shouldShowImageList}
        price={props.chap.price}
        paymentMutate={paymentMutate}
        {...props.chap}
      />
      <ChapterCard
        id="NextChapter"
        shouldShowCard={shouldShowImageList}
        dynamicChapterSlug={chapterSLugify(props.getNextChapter(props.chap))}
        dynamicChapterNum={props.getNextChapter(props.chap)}
        {...props.chap}
      />
    </Container>
  )
}

function ImageList({
  images,
  imagesWithSizes,
  paymentMutate,
  comicTitle,
  className,
  shouldShowImageList,
  price,
  comicSlug,
  chapterSlug,
}) {
  return shouldShowImageList ? (
    images?.length > 0 ? (
      <ul className={className}>
        {images.map((item, index) => {
          const { width, height } = imagesWithSizes[index].size
          return (
            <ImageCard
              key={item.id}
              comicTitle={comicTitle}
              width={width}
              height={height}
              layout="responsive"
              {...item}
            />
          )
        })}
      </ul>
    ) : (
      <NoImagesFallback />
    )
  ) : (
    <BuyChapter
      price={price}
      paymentMutate={paymentMutate}
      comicSlug={comicSlug}
      chapterSlug={chapterSlug}
    />
  )
}

function BuyChapter({ price, paymentMutate, comicSlug, chapterSlug }) {
  const { buyChapter } = useUserApi()
  const { mutateUser } = useAuthState()

  const handleBuyChapter = () => {
    if (window.confirm(`Are you sure to buy this Chapter for ${price} coins?`)) {
      return buyChapter({ comicSlug: comicSlug, chapterSlug: chapterSlug }).then((res) => {
        if (res?.bought === true) {
          paymentMutate()
          mutateUser()
          toast.success(res?.message)
        } else {
          toast.error(res?.message)
        }
      })
    }
  }

  return (
    <form onClick={handleBuyChapter} className="my-4 mx-auto max-w-md cursor-pointer space-y-4">
      <span className="group color-card-hover color-border-primary color-card block rounded-lg border p-6 shadow-md">
        <article className="flex flex-row items-center">
          <div className="flex h-full flex-col">
            <h2 className="color-text-primary color-text-primary-group-hover text-base font-semibold capitalize line-clamp-1">
              Unlock for {price} coins
            </h2>
            <span className="color-text-primary color-text-primary-group-hover pt-4 text-sm font-semibold capitalize underline line-clamp-1">
              You need to buy this chapter to continue reading
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
      </span>
    </form>
  )
}

function NoImagesFallback() {
  return (
    <Container className="mt-7">
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamation className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Admin did not upload any images in this chapter
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Please contact admin to fix this problem.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function ImageCard({ src, width, height, comicTitle }) {
  return (
    <li className="relative flex justify-center">
      <Image
        className="h-auto max-w-full"
        alt={comicTitle}
        src={src}
        width={width}
        height={height}
        isImgTag
        unoptimized
      />
    </li>
  )
}

function ChapterCard(props) {
  const {
    shouldShowCard,
    comic_title: comicTitle,
    comicSlug,
    dynamicChapterSlug,
    dynamicChapterNum,
  } = props
  return shouldShowCard && props?.images.length > 0 && dynamicChapterSlug ? (
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
