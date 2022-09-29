import Image from '../Image'
import Tag from '../Tag'

function SliderCard({ thumbnail: src, slug, title, description, categories: tags }) {
  //   const comics = unstable_comics.comics
  return (
    <div className="relative">
      <div className="mx-2 ">
        <div className="relative flex-shrink-0 overflow-hidden rounded-md xl:rounded-2xl">
          <Image
            src={src}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-top"
            layout="fill"
            // width={330}
            // height={345}
            priority
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75"></div>

          <div className="relative flex h-96 w-full flex-col items-end justify-between p-8 align-bottom">
            <div className="flex h-full w-full flex-col justify-end xl:flex-row xl:items-end xl:justify-between">
              {/* Style: Title And button right bottom */}
              <ul className="xl:hidden">
                {tags.map((tag) => (
                  <Tag key={tag} text={'Adventure'} />
                ))}
              </ul>
              <h2 className="mb-1 text-xl font-medium capitalize text-stone-50 line-clamp-1">
                {title}
              </h2>
              <p className="text-lg font-normal text-stone-50 line-clamp-2 xl:hidden">
                {description}
              </p>
              <a
                href="#"
                className="hidden rounded-full bg-white p-2 text-sm font-medium capitalize text-primary-600 xl:block "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  aria-label="Arrow right Icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SliderCard