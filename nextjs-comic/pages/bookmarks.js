import CardBookmark from '@/components/Card/CardBookmark'
import AuthCheck from '@/components/common/AuthCheck'
import Container from '@/components/common/Container'
import CustomLink from '@/components/common/Link'
import { PageSEO } from '@/components/SEO'
import PictureGroupSkeleton from '@/components/Skeleton/PictureGroupSkeleton'
import useFetch from '@/hooks/api/useFetch'
import useFetchV2 from '@/hooks/api/useFetchV2'
import useBookmarkApi from '@/services/bookmarkServices'
import { getCategoriesFn } from '@/services/categoryServices.js'
import { useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
const { motion } = require('framer-motion')

export default function BookmarkPage() {
  const [activeCategory, setActiveCategory] = useState({ id: null, name: 'All' })

  return (
    <>
      <PageSEO title={'Your Bookmarks'} />
      <AuthCheck showDefaultFallback>
        <FilterNav changeActiveCategory={setActiveCategory} activeCategory={activeCategory} />
        <Container className="transform duration-500">
          <div className="relative px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pt-8 lg:pb-28">
            <div className="absolute inset-0">
              <div className="h-1/3 sm:h-2/3" />
            </div>
            <div className="relative mx-auto max-w-7xl">
              <BookmarkList
                activeCategory={activeCategory}
                className="mx-auto mt-12 grid  grid-cols-responsive-card gap-5 lg:max-w-none"
              />
            </div>
          </div>
        </Container>
      </AuthCheck>
    </>
  )
}
function BookmarkList({ activeCategory, className, limit }) {
  const { getUserBookmarksUrl } = useBookmarkApi()
  const { data: bookmarksData, isLoading } = useFetch({
    url: getUserBookmarksUrl.url,
    fetcher: getUserBookmarksUrl.fetcher,
  })

  const comics = bookmarksData?.bookmarks.map((bookmark) => bookmark.comic)

  const filterByCategory = (comics) => {
    if (!activeCategory?.id) return comics
    return comics?.filter((comic) => {
      // some: tests whether at least one element in the array passes
      return comic?.categories.some((category) => category.id === activeCategory.id)
    })
  }

  const filtered = filterByCategory(comics)

  return isLoading ? (
    <div className={className}>
      {Array(10)
        .fill()
        .map((index) => {
          return <PictureGroupSkeleton height={269} key={index} hasIcon={false} />
        })}
    </div>
  ) : (
    filtered?.length > 0 && (
      <motion.div layout className={className}>
        {filtered.slice(0, limit).map((item, index) => (
          <motion.div key={item.slug || item.id} layout>
            <CardBookmark index={index} {...item} />
          </motion.div>
        ))}
      </motion.div>
    )
  )
}

function FilterNav({ changeActiveCategory, activeCategory }) {
  let { data: categories } = useFetchV2({ func: getCategoriesFn })
  const allCategory = { id: null, name: 'All' }

  if (categories) categories = [allCategory, ...categories]

  const handleCategoryChange = (category) => {
    changeActiveCategory(category)
  }

  return (
    <nav className="mx-4 flex min-h-[64px] lg:mx-0 lg:space-x-8 lg:px-8" aria-label="Global">
      <div className="mx-auto mt-8 w-full sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(event) =>
            handleCategoryChange(
              categories.find((category) => category.name === event.target.value)
            )
          }
        >
          {categories?.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <ScrollContainer className="scroll-container cursor-pointer">
            <nav className="-mb-px flex max-w-[90vw] space-x-8" aria-label="Tabs">
              {categories?.map((category) => (
                <CustomLink
                  onClick={() => handleCategoryChange(category)}
                  key={category.name}
                  className="relative whitespace-nowrap py-4 text-sm font-medium"
                  aria-current={activeCategory.name === category.name ? 'page' : undefined}
                >
                  {category.name}
                  {activeCategory.name === category.name && (
                    <motion.div
                      className="absolute bottom-[0.5px] w-full whitespace-nowrap border-b-2 border-indigo-500 text-sm font-medium text-indigo-600"
                      layoutId="underline"
                    />
                  )}
                </CustomLink>
              ))}
            </nav>
          </ScrollContainer>
        </div>
      </div>
    </nav>
  )
}
