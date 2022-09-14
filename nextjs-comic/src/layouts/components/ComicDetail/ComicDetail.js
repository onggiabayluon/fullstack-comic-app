import {
  faCircleExclamation,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";

import { faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import Link from "next/link";
import ComicCard from "~/components/ComicCard";
import CommentForm from "~/components/CommentForm";
import CommentList from "~/components/CommentList";
import MyImage from "~/components/MyImage";
import Section from "~/components/Section";
import { useAsyncFn } from "~/hooks/useAsync";
import useComic from "~/hooks/useComic";
import { publicRoutes } from "~/routes";
import { createComment } from "~/services/commentService";
import styles from "./ComicDetail.module.scss";
const cx = classNames.bind(styles);

function ComicDetail() {
  // Get comic data
  const { comic, rootComments, getFirstChapter, createLocalComment } =
    useComic();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  const firstChapter = getFirstChapter();

  function onCommentCreate(message) {
    return createCommentFn({ comicSlug: comic.slug, message }).then(
      createLocalComment
    );
  }

  return (
    <main className={cx("content-wrapper")}>
      <section className={cx("detail-background")}>
        <MyImage
          className={"box-img"}
          src={comic.src}
          alt={comic.alt}
          layout="fill"
        />
      </section>

      <Section className={cx("detail-box")} container>
        <div className={cx("box-header")}>
          <span className={cx("box-thumbnail")}>
            {/* <MyImage
              className={"box-img"}
              src="/long_omniscient_reader.png"
              alt={comic.alt}
              layout="fill"
            /> */}
          </span>

          <div className={cx("box-info")}>
            <span className={cx("genre")}>
              {comic.tags.map((tag) => (
                <span key={tag.id} className={cx("tag")}>
                  <Link href={publicRoutes.categories.getDynamicPath(tag.name)}>
                    <a className={cx("white-text")}>{tag.name}</a>
                  </Link>
                </span>
              ))}
            </span>
            <h1 className={cx("title")}>{comic.title}</h1>

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
                Chapter of <em>{comic.title}</em>
              </strong>
            </div>

            <ul className={cx("card-list")}>
              {comic.chapters.map((chapter, index) => (
                <ComicCard
                  key={chapter.id}
                  src={comic.src}
                  index={index}
                  chapter={chapter}
                  href={publicRoutes.chapterDetail.getDynamicPath(
                    comic.slug,
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
            <p className={cx("summary")}>{comic.description}</p>
            <Button
              primary
              large
              rounded
              block
              href={publicRoutes.chapterDetail.getDynamicPath(
                comic.slug,
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
        {/* Comment Form */}
        <CommentForm
          autoFocus
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />

        {/* Comments */}
        {rootComments != null && rootComments.length > 0 && (
          <CommentList comments={rootComments}></CommentList>
        )}
      </Section>
    </main>
  );
}

export default ComicDetail;
