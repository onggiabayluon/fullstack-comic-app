import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import Sidebar from "~/layouts/components/Sidebar";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import Content from "../components/Content";

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
