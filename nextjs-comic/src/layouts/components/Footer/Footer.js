import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";

import styles from "./Footer.module.scss";
import { useEffect } from "react";
import Link from "next/link";
const cx = classNames.bind(styles);

function Footer({ brandName }) {
  useEffect(() => {
    console.log("footer");
  });

  return (
    <footer className={cx("footer")}>
      <div className={cx("left-footer")}>
        {/* <Link href="https://coreui.io">CoreUI</Link> */}
        <span>&copy; 2022 {brandName}.</span>
      </div>
      <div className={cx("right-footer")}>
        <ul className={cx("right-wrapper")}>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
