import classNames from '@/lib/utils/classNames'
import NextImage from 'next/image'
import { useState } from 'react'
import PictureGroupSkeleton from './Skeleton/PictureGroupSkeleton'
// eslint-disable-next-line jsx-a11y/alt-text
// const Image = ({ ...rest }) => <NextImage {...rest} />
const Image = ({ hasPlaceholder = true, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true)
  return rest.src ? (
    <div
      className={classNames(isLoading ? 'relative' : '')}
      style={{ width: `${rest.width}px`, height: `${rest.height}px` }}
    >
      {hasPlaceholder && isLoading && (
        <span className="absolute inset-0 z-50">
          <PictureGroupSkeleton hasIcon={false} height={rest.height} width={rest.width} />
        </span>
      )}
      <span className={classNames(isLoading ? 'opacity-0' : 'opacity-100')}>
        <NextImage
          src={rest.src}
          height={rest.height}
          width={rest.width}
          onLoadingComplete={() => setIsLoading(false)}
          // placeholder="blur"
          // blurDataURL={blur}
          {...rest}
        />
      </span>
    </div>
  ) : null
}

export default Image
