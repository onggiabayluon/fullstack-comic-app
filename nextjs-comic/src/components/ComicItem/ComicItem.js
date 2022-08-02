import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
// import Image from "~/components/Image";
import Image from "next/image";
import styles from "./ComicItem.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

function ComicItem({ data }) {
  return (
    <Link href={`/comics/${data.slug}`} className={cx("wrapper")}>
      <a className={cx("avatar-wrapper")}>
        <Image
          className={cx("avatar")}
          src={data.thumbnail}
          alt={data.title}
          width={40}
          height={40}
        />
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            <span>{data.title}</span>
          </h4>
          <span className={cx("chapter")}>C.01</span>
        </div>
      </a>
    </Link>
  );
}

ComicItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComicItem;
