import {
  faCircleExclamation,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";

import styles from "./ComicDetail.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import { faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import MyImage from "~/components/MyImage";
import { publicRoutes } from "~/routes";
import ComicCard from "~/components/ComicCard";
import Section from "~/components/Section";
import useComic from "~/hooks/useComic";
import CommentList from "~/components/CommentList";
const cx = classNames.bind(styles);

function ComicDetail() {
  // Get comic data
  const { comic, rootComments } = useComic();

  // Destructuring
  const {
    src,
    alt,
    slug: comicSlug,
    title,
    chapters,
    tags,
    description,
    created_date: createdDate,
  } = comic;

  const firstChapter = chapters?.length ? chapters[0] : null;

  return (
    <main className={cx("content-wrapper")}>
      <section className={cx("detail-background")}>
        <MyImage className={"box-img"} src={src} alt={alt} layout="fill" />
      </section>

      <Section className={cx("detail-box")} container>
        <div className={cx("box-header")}>
          <span className={cx("box-thumbnail")}>
            {/* <MyImage
              className={"box-img"}
              src="/long_omniscient_reader.png"
              alt={alt}
              layout="fill"
            /> */}
          </span>

          <div className={cx("box-info")}>
            <span className={cx("genre")}>
              {tags.map((tag) => (
                <span key={tag.id} className={cx("tag")}>
                  <Link href={publicRoutes.categories.getDynamicPath(tag.name)}>
                    <a className={cx("white-text")}>{tag.name}</a>
                  </Link>
                </span>
              ))}
            </span>
            <h1 className={cx("title")}>{title}</h1>

            <div className={cx("author_area")}>
              singNsong , UMI ...
              <FontAwesomeIcon
                className={cx("btnAuthorInfo")}
                icon={faCircleExclamation}
              />
            </div>
          </div>
        </div>

        <div className={cx("box-body")}>
          <div className={cx("body-left")}>
            <div className={cx("box-title")}>
              <strong>
                Chapter of <em>{title}</em>
              </strong>
            </div>

            <ul className={cx("card-list")}>
              {chapters.map((chapter, index) => (
                <ComicCard
                  key={chapter.id}
                  src={src}
                  index={index}
                  chapter={chapter}
                  href={publicRoutes.chapterDetail.getDynamicPath(
                    comicSlug,
                    chapter.chapterSlug
                  )}
                  {...(index == 0 && { borderTop: true })}
                  borderBottom
                  className={cx("card", "card-hover")}
                ></ComicCard>
              ))}
            </ul>
          </div>

          <div className={cx("body-right")}>
            <ul className={cx("grade_area")}>
              <li className={"d-flex align-items-center"}>
                <FontAwesomeIcon
                  className={cx("ico", "ico_view")}
                  icon={faEye}
                />
                <em className={cx("value", "view_value")}>726.4M</em>
              </li>
              <li>
                <FontAwesomeIcon
                  className={cx("ico", "ico_subscribe")}
                  icon={faPersonCirclePlus}
                />
                <em className={cx("value", "subscribe_value")}>2.3M</em>
              </li>
              <li>
                <FontAwesomeIcon
                  className={cx("ico", "ico_grade")}
                  icon={faStar}
                />
                <em className={cx("value", "grade_value")}>9.73</em>
                <Button
                  primary
                  small
                  rounded
                  href={"/test"}
                  className={cx("btn_rate")}
                >
                  RATE
                </Button>
              </li>
            </ul>
            <p className={cx("summary")}>{description}</p>
            <Button
              primary
              large
              rounded
              block
              href={publicRoutes.chapterDetail.getDynamicPath(
                comicSlug,
                firstChapter.chapterSlug
              )}
              className={(cx("btn_next"), "margin-top--md")}
            >
              First Chapter
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Comments" className="comments-box" container spacing>
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments}></CommentList>
        )}
      </Section>
    </main>
  );
}

export default ComicDetail;
