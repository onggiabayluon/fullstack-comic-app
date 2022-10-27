import AuthCheck from '@/components/common/AuthCheck'
import Container from '@/components/common/Container'
import Image from '@/components/common/Image'
import CustomLink from '@/components/common/Link'
import PictureGroupSkeleton from '@/components/Skeleton/PictureGroupSkeleton'
import useFetch from '@/hooks/api/useFetch'
import classNames from '@/lib/utils/classNames'
import { publicRoutes } from '@/lib/utils/getRoutes'
import useBookmarkApi from '@/services/bookmarkServices'
import ScrollContainer from 'react-indiana-drag-scroll'
const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export default function BookmarkPage() {
  return (
    <AuthCheck>
      <FilterNav />
      <Container className="transform duration-500">
        <div className="relative px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pt-8 lg:pb-28">
          <div className="absolute inset-0">
            <div className="h-1/3 sm:h-2/3" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <BookmarkList className="mx-auto mt-12 grid  grid-cols-responsive-card gap-5 lg:max-w-none" />
          </div>
        </div>
      </Container>
    </AuthCheck>
  )
}
function BookmarkList({ className, limit }) {
  const { getUserBookmarksUrl } = useBookmarkApi()
  const { data, isLoading } = useFetch({
    url: getUserBookmarksUrl.url,
    fetcher: getUserBookmarksUrl.fetcher,
  })
  const comics = data?.bookmarks.map((bookmark) => bookmark.comic)

  if (isLoading) {
    return (
      <div className={className}>
        {Array(12)
          .fill()
          .map((index) => {
            return <PictureGroupSkeleton height={269} key={index} hasIcon={false} />
          })}
      </div>
    )
  }
  return comics?.length > 0 ? (
    <ul className={className}>
      {comics.slice(0, limit).map((item, index) => (
        <BookmarkCard key={item.slug || item.id} index={index} {...item} />
      ))}
    </ul>
  ) : null
}

function BookmarkCard(item) {
  return (
    <article className="group relative max-w-[311px] transform cursor-pointer duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        <CustomLink
          href={publicRoutes.comicDetail.getDynamicPath(item.slug)}
          className="h-auto w-full transform overflow-hidden duration-200 hover:scale-110"
        >
          <Image
            width={311}
            height={145}
            className="h-48 w-full object-cover object-top"
            src={item.thumbnail}
            alt={item.title}
          />
        </CustomLink>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <div className="flex flex-row space-x-2">
              {item.categories?.slice(0, 2).map((category) => (
                <p key={category.id} className="text-sm font-medium text-indigo-600">
                  <a
                    href={publicRoutes.categories.getDynamicPath(category.name)}
                    className="hover:underline"
                  >
                    {category.name}
                  </a>
                </p>
              ))}
            </div>
            <a href={publicRoutes.comicDetail.getDynamicPath(item.slug)} className="mt-2 block">
              <p className="text-md font-semibold text-gray-900 line-clamp-2">{item.title}</p>
            </a>
          </div>
          {/* <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-3"></div>
                  </div> */}
        </div>
      </div>
    </article>
  )
}
function FilterNav() {
  const tabs = [
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Team Members', href: '#', current: true },
    { name: 'Billing', href: '#', current: false },
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
  ]
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
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <ScrollContainer className="scroll-container cursor-pointer">
            <nav className="-mb-px flex max-w-[90vw] space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </ScrollContainer>
        </div>
      </div>
    </nav>
  )
}
