import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const cx = classNames.bind(styles);

export default function Section({
  title,
  href,
  className,
  children,
  passRef = {},
}) {
  const classes = cx("section", {
    [className]: className,
  });

  return (
    <section className={classes}>
      <div className={cx("section__header")}>
        <div className={cx("section__title")}>
          <Link href={href}>
            <h2> {title} </h2>
          </Link>
        </div>
        <div className={cx("section__nav")}>
          <FontAwesomeIcon
            className={cx("right")}
            icon={faChevronLeft}
            onClick={() => passRef.current?.slickPrev()}
          />
          <FontAwesomeIcon
            className={cx("left")}
            icon={faChevronRight}
            onClick={() => passRef.current?.slickNext()}
          />
        </div>
      </div>
      <div className={cx("section__container")}>{children}</div>
    </section>
  );
}
