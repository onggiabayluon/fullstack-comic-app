import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./Section.module.scss";

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
  onSliderRef = {},
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
            <span
              className="right d-flex"
              onClick={() => onSliderRef.current?.slickPrev()}
            >
              <FontAwesomeIcon icon={faChevronLeft} width={10} height={10} />
            </span>

            <span
              className="left d-flex"
              onClick={() => onSliderRef.current?.slickNext()}
            >
              <FontAwesomeIcon icon={faChevronRight} width={10} height={10} />
            </span>
          </div>
        )}
      </div>
      <div className={cx("section__container")}>{children}</div>
    </section>
  );
}
