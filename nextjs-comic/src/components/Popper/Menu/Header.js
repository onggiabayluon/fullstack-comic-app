import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
  return (
    <header className={cx("header")}>
      <button className={"back-btn"} onClick={onBack}>
        <FontAwesomeIcon width={15} height={15} icon={faChevronLeft} />
      </button>
      <h4 className={cx("header-title")}>{title}</h4>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Header;
