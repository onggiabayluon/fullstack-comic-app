import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import MyImage from "~/components/MyImage";

// import Image from "~/components/Image";
import Image from "next/image";
import Link from "next/link";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link href={`/@${data.nickname}`} className={cx("wrapper")}>
      <a className={cx("avatar-wrapper")}>
        <MyImage
          className={cx("avatar")}
          src={data.avatar}
          alt={data.full_name}
          width={40}
          height={40}
        />

        <div className={cx("info")}>
          <h4 className={cx("name")}>
            <span>{data.full_name}</span>
            {data.tick && (
              <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
            )}
          </h4>
        </div>
      </a>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
