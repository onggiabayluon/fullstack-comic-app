import styles from "./Section.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Section({ title }) {
  return (
    <section className={cx("astro")}>
      <div className={cx("astro__header")}>
        <div className={cx("astro__title")}>
          <Link href={"/"}>
            <h2> {title} </h2>
          </Link>
        </div>
        <div className={cx("astro__nav")}>
          <FontAwesomeIcon className={cx("right")} icon={faChevronLeft} />
          <FontAwesomeIcon className={cx("left")} icon={faChevronRight} />
        </div>
      </div>
      <div className={cx("astro__container")}>
        <article className={cx("astro__card")}>
          <div className={cx("astro__thumbnail-wrap")}>
            <a href="#">
              <img
                className={cx("astro__image")}
                src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/09/pseudo-effects.jpg?fit=1024%2C512&ssl=1"
                alt="Featured image"
              />
            </a>
          </div>
          <div className={cx("astro__figcaption")}>
            <div className={cx("astro__bottom")}>
              <h3 className={cx("astro__title truncate-single")}>
                <Link href={"#"}>
                  <a className="white-text">Kill the hero</a>
                </Link>
              </h3>
              <div className={cx("icon-wrapper")}>
                <FontAwesomeIcon
                  className={cx("arrow-right")}
                  icon={faCaretRight}
                  size="sm"
                />
              </div>
            </div>

            <p className={cx("astro__description")}>
              There is a new thing coming in CSS: @layer. As with all new
              things, it takes time to really wrap your head around it. And
              despite me tapping at my keyboard about it, full disclosure, I’m
              not sure my mind is fully there yet. Fortunately, smart people are
              on the case!
            </p>
          </div>
        </article>
        <article className={cx("astro__card")}>
          <div className={cx("astro__thumbnail-wrap")}>
            <a href="#">
              <img
                className={cx("astro__image")}
                src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/09/pseudo-effects.jpg?fit=1024%2C512&ssl=1"
                alt="Featured image"
              />
            </a>
          </div>
          <div className={cx("astro__figcaption")}>
            <div className={cx("astro__bottom")}>
              <h3 className={cx("astro__title truncate-single")}>
                <Link href={"#"}>
                  <a className="white-text">Kill the hero</a>
                </Link>
              </h3>
              <div className={cx("icon-wrapper")}>
                <FontAwesomeIcon
                  className={cx("arrow-right")}
                  icon={faCaretRight}
                  size="sm"
                />
              </div>
            </div>

            <p className={cx("astro__description")}>
              There is a new thing coming in CSS: @layer. As with all new
              things, it takes time to really wrap your head around it. And
              despite me tapping at my keyboard about it, full disclosure, I’m
              not sure my mind is fully there yet. Fortunately, smart people are
              on the case!
            </p>
          </div>
        </article>
        <article className={cx("astro__card")}>
          <div className={cx("astro__thumbnail-wrap")}>
            <a href="#">
              <img
                className={cx("astro__image")}
                src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/09/pseudo-effects.jpg?fit=1024%2C512&ssl=1"
                alt="Featured image"
              />
            </a>
          </div>
          <div className={cx("astro__figcaption")}>
            <div className={cx("astro__bottom")}>
              <h3 className={cx("astro__title truncate-single")}>
                <Link href={"#"}>
                  <a className="white-text">Kill the hero</a>
                </Link>
              </h3>
              <div className={cx("icon-wrapper")}>
                <FontAwesomeIcon
                  className={cx("arrow-right")}
                  icon={faCaretRight}
                  size="sm"
                />
              </div>
            </div>

            <p className={cx("astro__description")}>
              There is a new thing coming in CSS: @layer. As with all new
              things, it takes time to really wrap your head around it. And
              despite me tapping at my keyboard about it, full disclosure, I’m
              not sure my mind is fully there yet. Fortunately, smart people are
              on the case!
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
