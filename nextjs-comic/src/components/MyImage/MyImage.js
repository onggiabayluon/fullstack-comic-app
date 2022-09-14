import classNames from "classnames/bind";
import Image from "next/image";
import { blur } from "../Shimmer/Shimmer";
import styles from "./MyImage.module.scss";

const cx = classNames.bind(styles);

export default function MyImage({
  src,
  alt,
  width,
  height,
  className,
  objectFit = "cover",
  layout,
  priority,
  hasBlur = true,
}) {
  const classes = cx("card__card", {
    [className]: className,
  });

  return (
    <Image
      className={classes}
      src={src}
      alt={alt}
      width={width}
      height={height}
      objectFit={objectFit}
      layout={layout}
      priority={priority}
      placeholder={hasBlur ? "blur" : ""}
      blurDataURL={blur}
    />
  );
}
