import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ComicSearchCard.module.scss";
import Link from "next/link";
import MyImage from "~/components/MyImage";

const cx = classNames.bind(styles);

function ComicSearchCard({ data }) {
  return (
    <div className={cx("wrapper")}>
      <Link href={`/comics/${data.slug}`}>
        <a className={cx("avatar-wrapper")}>
          <MyImage
            className={cx("card__image")}
            src={data.src}
            alt={data.title}
            width={50}
            height={50}
          />

          <div className={cx("info")}>
            <h4 className={cx("name")}>
              <span>{data.title}</span>
            </h4>
            <ul className={cx("chapter-wrapper")}>
              {data.chapters?.slice(0, 2).map((chapter) => (
                <Link
                  key={chapter.chapterNum}
                  href={data.slug + "/" + chapter.slug}
                >
                  <li className={cx("chapter")} style={{}}>
                    C.
                    <span className={cx("chapter-span")}>
                      {chapter.chapterNum}
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
  data: PropTypes.object.isRequired,
};

export default ComicSearchCard;
