import styles from "./ComicCard.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

export default function ComicCard({
  className,
  children,
  src,
  objectFit = "cover",
}) {
  const classes = cx("card__card", {
    [className]: className,
  });

  return (
    <article className={classes}>
      <div className={cx("card__left")}>
        <Link href="#">
          <a>
            <Image
              className={cx("card__image")}
              src={src}
              alt="Featured image"
              width={80}
              height={80}
              objectFit={objectFit}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg=="
            />
          </a>
        </Link>
      </div>
      <div className={cx("card__right")}>
        <div className={cx("header")}>
          <div className={cx("tags")}>
            <span className={cx("tag")}>
              <Link href={"#"}>
                <a className="light-text">Sonen</a>
              </Link>
            </span>
            <span className={cx("tag")}>
              <Link href={"#"}>
                <a className="light-text">Adventure</a>
              </Link>
            </span>
          </div>

          <span className={cx("timer", "light-text")}>
            <FontAwesomeIcon className={cx("timer__icon")} icon={faClock} />
            <span className={cx("timer__text")}>1 Mins ago</span>
          </span>
        </div>

        <h2 className={cx("card__title", "truncate-blur")}>
          <Link href={"#"}>
            <a>A Returner’s Magic Should Be Special</a>
          </Link>
        </h2>

        <ul className={cx("card__chapters")}>
          <Link href={"/test2"}>
            <li className={cx("chapter")}>C.01</li>
          </Link>
          <Link href={"/test2"}>
            <li className={cx("chapter")}>C.02</li>
          </Link>
        </ul>
      </div>
    </article>
  );
}
