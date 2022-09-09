import styles from "./Section.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Fragment } from "react";

const cx = classNames.bind(styles);

export default function Section({
  title = "",
  href = "",
  className,
  children,
  doubleLayoutGrid,
  tripleLayoutGrid,
  hasNav = false,
  container = false,
  spacing = false,
  extraClasses,
  passRef = {},
}) {
  let LinkComp = Fragment;
  if (href) {
    LinkComp = Link;
  }

  const classes = cx(
    "section",
    {
      [className]: className,
      doubleLayoutGrid,
      tripleLayoutGrid,
      container,
      spacing,
    },
    extraClasses
  );

  return (
    <section className={classes}>
      <div className={cx("section__header")}>
        <div className={cx("section__title")}>
          <LinkComp {...(href && { href: href })}>
            <h2> {title} </h2>
          </LinkComp>
        </div>
        {hasNav && (
          <div className={cx("section__nav")}>
            <FontAwesomeIcon
              className="right icon"
              icon={faChevronLeft}
              onClick={() => passRef.current?.slickPrev()}
            />
            <FontAwesomeIcon
              className="left icon"
              icon={faChevronRight}
              onClick={() => passRef.current?.slickNext()}
            />
          </div>
        )}
      </div>
      <div className={cx("section__container")}>{children}</div>
    </section>
  );
}
