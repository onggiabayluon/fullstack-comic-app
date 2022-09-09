import styles from "./ComicCard.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import MyImage from "~/components/MyImage";
import { publicRoutes } from "~/routes";
import { Fragment } from "react";

const cx = classNames.bind(styles);

export default function ComicCard({
  src,
  index,
  comic,
  chapter,
  className,
  href,
  LIMIT = 3,
  borderTop = false,
  borderBottom = false,
  hasHeader = true,
  width = 80,
  height = 80,
  extraClass,
  ...passProps
}) {
  const classes = cx({
    [className]: className,
    borderTop,
    borderBottom,
    [extraClass]: extraClass,
  });

  let Comp = "article";
  let LinkWrapper = Fragment;

  if (href) {
    Comp = "li";
    LinkWrapper = Wrapper;
  }

  return (
    <Comp
      className={classes}
      {...passProps}
      style={{ "--column": height + "px" }}
    >
      <LinkWrapper {...(href && { href: href })}>
        {chapter ? (
          <ChapterStyle src={src} {...chapter} index={index}></ChapterStyle>
        ) : (
          <ComicStyle
            src={src}
            {...comic}
            LIMIT={LIMIT}
            hasHeader={hasHeader}
            width={width}
            height={height}
          ></ComicStyle>
        )}
      </LinkWrapper>
    </Comp>
  );
}

const Wrapper = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className={cx("card__link")}>{children}</a>
    </Link>
  );
};

const ChapterStyle = (props) => {
  return (
    <>
      <ChapterLeft {...props} />
      <ChapterRight {...props} />
    </>
  );
};
const ComicStyle = (props) => {
  return (
    <>
      <ComicLeft {...props} />
      <ComicRight {...props} />
    </>
  );
};

const ComicLeft = (props) => {
  return (
    <div className={cx("comic-card__left")} style={{ height: props.height }}>
      <Link href={publicRoutes.comicDetail.getDynamicPath(props.slug)}>
        <a>
          <MyImage
            className={cx("comic-card__image")}
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        </a>
      </Link>
    </div>
  );
};

const ComicRight = ({
  tags,
  created_date: createdDate,
  slug,
  title,
  chapters,
  LIMIT,
  hasHeader,
}) => {
  return (
    <div className={cx("comic-card__right")}>
      {hasHeader && (
        <div className={cx("header")}>
          <div className={cx("tags")}>
            {tags?.map((tag) => (
              <span key={tag.id} className={cx("tag")}>
                <Link href={publicRoutes.categories.getDynamicPath(tag.name)}>
                  <a className="light-text">{tag.name}</a>
                </Link>
              </span>
            ))}
          </div>

          <span className={cx("timer", "light-text")}>
            <FontAwesomeIcon className={cx("timer__icon")} icon={faClock} />
            <span className={cx("timer__text")}>{createdDate}</span>
          </span>
        </div>
      )}

      <h2 className={cx("comic-card__title", "truncate-blur")}>
        <Link href={publicRoutes.comicDetail.getDynamicPath(slug)}>
          <a>{title}</a>
        </Link>
      </h2>

      <ul className={cx("comic-card__chapters")}>
        {chapters?.slice(0, LIMIT).map((chapter) => (
          <Link
            key={chapter.chapterSlug}
            href={publicRoutes.chapterDetail.getDynamicPath(
              slug,
              chapter.chapterSlug
            )}
          >
            <li className={cx("chapter")}>C.{chapter.chapterNum}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const ChapterLeft = (props) => {
  return (
    <span className={cx("card__thumbnail")}>
      <MyImage
        className={"img"}
        src={props.src}
        width={73}
        height={73}
        alt={props.alt}
      />
    </span>
  );
};
const ChapterRight = (props) => {
  return (
    <div className={cx("card__info-wrapper")}>
      <span className={cx("card__num")}>Chapter {props.chapterNum}</span>
      <span className={cx("card__date")}>{props.created_date}</span>
      <span className={cx("card__likearea")}>
        <FontAwesomeIcon className={cx("card__like-ico")} icon={faHeart} />
        <span className={cx("card__like-num")}>{props.like}</span>
      </span>
      <span className={cx("card__index")}>#{props.index + 1}</span>
    </div>
  );
};
