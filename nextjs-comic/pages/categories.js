import Container from '@/components/common/Container'
import Link from '@/components/common/Link'
import Tag from '@/components/Tag/Tag'
import { publicRoutes } from '@/lib/utils/getRoutes'
import { getCategories } from '@/services/categoryServices.js'
import { PageSEO } from 'components/SEO'
import { siteMetadata } from 'data/siteMetadata'
import kebabCase from 'lib/utils/kebabCase'

export async function getStaticProps() {
  // const tags = unstable_tags
  const tags = await getCategories({ type: 'detail' })

  return { props: { tags } }
}

export default function Tags({ tags }) {
  // const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  // console.log(sortedTags)
  return (
    <Container>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {tags.map((tag) => {
            return (
              <div key={tag.id} className="mt-2 mb-2 mr-5">
                <Tag text={tag.name} />
                <Link
                  href={publicRoutes.categories.getDynamicPath(kebabCase(tag.name))}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {`[${tag.count}]`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
