import NextImage from 'next/image'
import { blur } from './Skeleton/Shimmer'
// eslint-disable-next-line jsx-a11y/alt-text
// const Image = ({ ...rest }) => <NextImage {...rest} />
const Image = ({ ...rest }) =>
  rest.src ? (
    <NextImage
      height={rest.height}
      width={rest.width}
      placeholder="blur"
      blurDataURL={blur}
      src={rest.src}
      {...rest}
    />
  ) : null

export default Image
