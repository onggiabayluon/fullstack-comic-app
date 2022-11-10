import { publicRoutes } from '@/lib/utils/getRoutes'
import Image from '../common/Image'
import CustomLink from '../common/Link'

export default function CardBookmark(item) {
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
                  <CustomLink
                    href={publicRoutes.categories.getDynamicPath(category.name)}
                    className="hover:underline"
                  >
                    {category.name}
                  </CustomLink>
                </p>
              ))}
            </div>
            <CustomLink
              href={publicRoutes.comicDetail.getDynamicPath(item.slug)}
              className="mt-2 block"
            >
              <p className="text-md font-semibold text-gray-900 line-clamp-2">{item.title}</p>
            </CustomLink>
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
