import classNames from "classnames/bind";
import Link from "next/link";
import PropTypes from "prop-types";
import MyImage from "~/components/MyImage";
import { publicRoutes } from "~/routes";
import styles from "./ComicSearchCard.module.scss";

const cx = classNames.bind(styles);

function ComicSearchCard({ comic }) {
  return (
    <div className={cx("wrapper")}>
      <Link href={`/comics/${comic.slug}`}>
        <a className={cx("avatar-wrapper")}>
          <MyImage
            className={cx("card__image")}
            src={comic.src}
            alt={comic.title}
            width={50}
            height={50}
          />

          <div className={cx("info")}>
            <h4 className={cx("name")}>
              <span>{comic.title}</span>
            </h4>
            <ul className={cx("chapter-wrapper")}>
              {comic.chapters?.slice(0, 2).map((chapter) => (
                <Link
                  key={chapter.chapter_num}
                  href={publicRoutes.chapterDetail.getDynamicPath(
                    comic.slug,
                    chapter.slug
                  )}
                >
                  <li className={cx("chapter")} style={{}}>
                    C.
                    <span className={cx("chapter-span")}>
                      {chapter.chapter_num}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </a>
      </Link>
    </div>
  );
}

ComicSearchCard.propTypes = {
  comic: PropTypes.object.isRequired,
};

export default ComicSearchCard;
