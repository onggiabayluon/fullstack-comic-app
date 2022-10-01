import NextImage from 'next/image'
import { blur } from './Skeleton/Shimmer'
// eslint-disable-next-line jsx-a11y/alt-text
// const Image = ({ ...rest }) => <NextImage {...rest} />
const Image = ({ ...rest }) => <NextImage placeholder="blur" blurDataURL={blur} {...rest} />

export default Image
