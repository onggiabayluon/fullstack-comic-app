import PictureGroupSkeleton from '@/components/Skeleton/PictureGroupSkeleton'
import classNames from '@/lib/utils/classNames'
import NextImage from 'next/image'
import { useState } from 'react'

const Image = ({ hasPlaceholder = true, isImgTag = false, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true)
  const ImageComp = NextImage
  // const ImageComp = isImgTag ? 'img' : NextImage
  return rest.src ? (
    <div className={classNames(isLoading ? 'relative' : '')}>
      {hasPlaceholder && isLoading && (
        <PictureGroupSkeleton
          height={rest.height}
          width={rest.width}
          className="absolute h-full max-w-full"
          hasIcon={false}
        />
      )}
      <span className={classNames(isLoading ? 'opacity-0' : 'opacity-100', 'flex items-center')}>
        <ImageComp src={rest.src} onLoadingComplete={() => setIsLoading(false)} {...rest} />
      </span>
    </div>
  ) : null
}

export default Image
