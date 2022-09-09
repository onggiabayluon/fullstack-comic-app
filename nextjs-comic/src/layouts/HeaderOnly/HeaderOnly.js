import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";

import styles from "./HeaderOnly.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
  return (
    <div className={cx("wrapper", "background-secondary")}>
      <Header hasHamburger={false} />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer brandName={"ComicSite"} />
    </div>
  );
}

export default HeaderOnly;
