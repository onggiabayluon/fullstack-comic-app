import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Link from "next/link";
import { publicRoutes } from "~/routes";
import { formatTimeAgo } from "~/utils/dateFormatter";
import MyImage from "../MyImage";

import styles from "./ComicCard.module.scss";

const cx = classNames.bind(styles);

function ComicCard({
  comic,
  chapter,
  index,
  className,
  globalClasses,
  width = 80,
  height = 80,
  tagLimit = 2,
  chapterLimit = 3,
  borderTop = false,
  borderBottom = false,
  isSearchStyle = false,
  isChapterStyle = false,
  ...passProps
}) {
  const classes = cx("card", {
    [className]: className,
    [globalClasses]: globalClasses,
    borderTop,
    borderBottom,
    cardSearch: isSearchStyle && "cardSearch",
    cardChapter: isChapterStyle && "cardChapter",
  });

  const comicDetailUrl = publicRoutes.comicDetail.getDynamicPath(comic?.slug);

  return isSearchStyle ? (
    <CardSearch />
  ) : isChapterStyle ? (
    <CardChapter />
  ) : (
    <CardDefault />
  );

  function CardDefault() {
    return (
      <Card className={classes} {...passProps}>
        <LeftCol>
          <Thumbnail
            src={comic.src}
            alt={comic.title}
            href={comicDetailUrl}
            width={width}
            height={height}
          />
        </LeftCol>
        <RightCol>
          <Header>
            <TagList tags={comic.tags} limit={tagLimit} />
            <Timer time={comic.created_date} />
          </Header>
          <Body>
            <Title title={comic.title} href={comicDetailUrl} />
            <ChapterList
              chapters={comic.chapters}
              comicSlug={comic.slug}
              limit={chapterLimit}
            />
          </Body>
        </RightCol>
      </Card>
    );
  }
  function CardSearch() {
    return (
      <Card className={classes} {...passProps}>
        <LeftCol>
          <Thumbnail
            src={comic.src}
            alt={comic.title}
            href={comicDetailUrl}
            width={width}
            height={height}
          />
        </LeftCol>
        <RightCol>
          <Body>
            <Title title={comic.title} href={comicDetailUrl} />
            <ChapterList
              chapters={comic.chapters}
              comicSlug={comic.slug}
              limit={chapterLimit}
            />
          </Body>
        </RightCol>
      </Card>
    );
  }
  function CardChapter() {
    return (
      <Card
        className={classes}
        href={publicRoutes.chapterDetail.getDynamicPath(
          comic.slug,
          chapter.chapter_slug
        )}
        {...passProps}
      >
        <LeftCol>
          <Thumbnail
            src={comic.src}
            alt={comic.title}
            href={comicDetailUrl}
            width={width}
            height={height}
            objectFit
          />
        </LeftCol>
        <RightCol>
          <Body>
            <span className={cx("card__chapter")}>
              Chapter {chapter.chapter_num}
            </span>
            <Timer time={comic.created_date} />
            <span className={cx("card__likearea")}>
              <FontAwesomeIcon
                className={cx("card__like-ico", "margin--left-sm")}
                icon={faHeart}
                width={15}
                height={15}
              />
              <span className={cx("card__like-num")}>{chapter.like}</span>
            </span>
            <span className={cx("card__index")}>#{index}</span>
          </Body>
        </RightCol>
      </Card>
    );
  }
}

// Main Card
function Card({ children, className, href, ...passprops }) {
  let Comp = href ? Link : "article";

  return (
    <Comp href={href}>
      <a className={className} {...passprops}>
        {children}
      </a>
    </Comp>
  );
}
// Left Body
function LeftCol({ children }) {
  return <div className={cx("card__left")}>{children}</div>;
}
function Thumbnail({ ...passprops }) {
  return (
    <div className={cx("card__thumbnail")}>
      <MyImage {...passprops} />
    </div>
  );
}

// Right Body
function RightCol({ children }) {
  return (
    <div className={cx("card__right", "margin-left--sm margin-right--sm")}>
      {children}
    </div>
  );
}
function Header({ children }) {
  return <div className={cx("card__header")}>{children}</div>;
}
function Title({ href, title }) {
  return (
    <h3 className={cx("card__title")}>
      <Link href={href}>
        <a>{title}</a>
      </Link>
    </h3>
  );
}
function TagList({ tags, limit }) {
  return (
    <ul className={cx("tag__list")}>
      {tags
        ? tags.slice(0, limit).map((tag) => <Tag key={tag.id} tag={tag} />)
        : null}
    </ul>
  );
}
function Tag({ tag }) {
  return (
    <div className={cx("tag__item")}>
      <Link href={publicRoutes.categories.getDynamicPath(tag.name)}>
        <a className="light-text">{tag.name}</a>
      </Link>
    </div>
  );
}
function Timer({ time }) {
  return (
    <div className={cx("timer", "light-text")}>
      <FontAwesomeIcon
        className={cx("timer__icon")}
        icon={faClock}
        width={15}
        height={15}
      />
      <span className={cx("timer__text")}>{formatTimeAgo(time)}</span>
    </div>
  );
}

function Body({ children }) {
  return <div className={cx("card__body")}>{children}</div>;
}
function ChapterList({ chapters, comicSlug, limit }) {
  return (
    <ul className={cx("chapter__list")}>
      {chapters
        ? chapters
            .slice(0, limit)
            .map((chapter) => (
              <Chapter
                key={chapter.id}
                comicSlug={comicSlug}
                chapter={chapter}
              />
            ))
        : null}
    </ul>
  );
}
function Chapter({ comicSlug, chapter }) {
  return (
    <Link
      href={publicRoutes.chapterDetail.getDynamicPath(
        comicSlug,
        chapter.chapter_slug
      )}
    >
      <a className={cx("chapter__item")}>C.{chapter.chapter_num}</a>
    </Link>
  );
}
export default ComicCard;
