import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
// import Image from "~/components/Image";
import Image from "next/image";
import styles from "./ComicSearchCard.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

function ComicSearchCard({ data }) {
  return (
    <div className={cx("wrapper")}>
      <Link href={`/comics/${data.slug}`}>
        <a className={cx("avatar-wrapper")}>
          <Image
            className={cx("avatar")}
            src={data.thumbnail}
            alt={data.title}
            width={48}
            height={48}
          />
          <div className={cx("info")}>
            <h4 className={cx("name")}>
              <span>{data.title}</span>
            </h4>
            <ul className={cx("chapter-wrapper")}>
              {data?.chapters.map((chapter) => (
                <Link
                  key={chapter.chapter_num}
                  href={data.slug + "/" + chapter.slug}
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
  data: PropTypes.object.isRequired,
};

export default ComicSearchCard;
