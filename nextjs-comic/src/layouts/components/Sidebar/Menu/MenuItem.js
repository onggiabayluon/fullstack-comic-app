import classNames from "classnames/bind";
import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
  const router = useRouter();

  return (
    <Link href={to}>
      <a className={cx("menu-item", { active: router.pathname == to })}>
        <span className={cx("icon")}>{icon}</span>
        <span className={cx("active-icon")}>{activeIcon}</span>
        <span className={cx("title")}>{title}</span>
      </a>
    </Link>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
