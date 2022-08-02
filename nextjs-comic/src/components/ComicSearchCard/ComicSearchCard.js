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
  console.log(data);
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
              <Link href={"/test2"}>
                <li className={cx("chapter")}>C.01</li>
              </Link>
              <Link href={"/test2"}>
                <li className={cx("chapter")}>C.02</li>
              </Link>
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
