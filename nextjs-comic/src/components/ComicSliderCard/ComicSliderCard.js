import styles from "./ComicSliderCard.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const cx = classNames.bind(styles);

export default function ComicSliderCard() {
  return (
    <article className={cx("card__card")}>
      <div className={cx("card__thumbnail-wrap")}>
        <Link href="#">
          <a>
            <Image
              className={cx("card__image")}
              src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/09/pseudo-effects.jpg?fit=1024%2C512&ssl=1"
              alt="Featured image"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg=="
              priority // priority Cuz it is on top of the page for pre-loading
            />
          </a>
        </Link>
      </div>
      <div className={cx("card__figcaption")}>
        <div className={cx("card__bottom")}>
          <h3 className={cx("card__title truncate-single w-150")}>
            <Link href={"#"}>
              <a className="white-text">Kill the hero</a>
            </Link>
          </h3>
          <div className={cx("card__icon-wrapper")}>
            <FontAwesomeIcon
              className={cx("card__arrow-right")}
              icon={faCaretRight}
              size="sm"
            />
          </div>
        </div>

        <p className={cx("card__description")}>
          There is a new thing coming in CSS: @layer. As with all new things, it
          takes time to really wrap your head around it. And despite me tapping
          at my keyboard about it, full disclosure, I’m not sure my mind is
          fully there yet. Fortunately, smart people are on the case!
        </p>
      </div>
    </article>
  );
}
