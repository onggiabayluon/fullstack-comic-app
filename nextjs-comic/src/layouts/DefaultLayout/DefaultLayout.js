import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import Content from "../components/Content";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  // Get sidebarRef
  const sidebarRef = useRef(null);

  useEffect(() => {
    console.log("home");
  }, []);

  return (
    <div className={cx("wrapper")}>
      {/* When click to hamburger icon in header then trigger showSidebar function to sidebar */}
      <Header sidebarRef={sidebarRef} />
      <div className={cx("container")}>
        <Sidebar ref={sidebarRef} />
        <Content className={cx("content")}>{children}</Content>
      </div>
      <Footer brandName="ComicSite" />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
