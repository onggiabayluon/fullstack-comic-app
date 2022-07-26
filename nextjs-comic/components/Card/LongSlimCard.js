import Image from '@/components/common/Image'
import CustomLink from '@/components/common/Link'
import TagList from '@/components/Tag/TagList'
import classNames from '@/lib/utils/classNames'
import { formatTimeAgo } from '@/lib/utils/dateFormatter'
import { publicRoutes } from '@/lib/utils/getRoutes'

function LongSlimCard(props) {
  const { src, title, updatedDate, chapters, categories: tags, slug, index } = props
  return (
    <article
      className={classNames(
        (index == 1 && 'md:border-t-2') || (index == 0 && 'border-t-2'),
        'border-gray flex min-h-[98px] w-full items-center space-x-3 self-center border-b-2 p-2  md:w-[49%]'
      )}
    >
      <CustomLink href={publicRoutes.comicDetail.getDynamicPath(slug)}>
        <div className=" h-20 w-20 ">
          <Image
            src={src}
            alt={title}
            className="absolute inset-0 aspect-square h-full w-full object-cover object-top"
            width={80}
            height={80}
          />
        </div>
      </CustomLink>
      <div>
        <span className="text-xl font-bold">{index + 1}</span>
      </div>
      <div className="flex h-full flex-col">
        <TagList limit={1} tags={tags} />
        <CustomLink className="line-clamp-1" href={publicRoutes.comicDetail.getDynamicPath(slug)}>
          <h2 className="text-primary-hover text-base font-semibold capitalize">{title}</h2>
        </CustomLink>
        <div>
          <span className="text-sm">{formatTimeAgo(updatedDate)}</span>
        </div>
      </div>
      {/* <div className="!ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 p-4">
        {chapters.map((chapter) => (
          <CustomLink
            key={chapter.slug}
            href={publicRoutes.chapterDetail.getDynamicPath(slug, chapter.slug)}
          >
            <span className="text-sm text-white">C{chapter.chapter_num}</span>
          </CustomLink>
        ))}
      </div> */}
    </article>
  )
}

export default LongSlimCard
