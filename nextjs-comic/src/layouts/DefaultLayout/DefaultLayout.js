import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Header from "~/layouts/components/Header";
import Sidebar from "~/layouts/components/Sidebar";
import styles from "./DefaultLayout.module.scss";
import { useEffect, useState, useCallback } from "react";
import Content from "../components/Content";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = useCallback(() => setSidebar(!sidebar), [sidebar]);

  useEffect(() => {
    console.log("home");
    // handleForceShowSidebarLaptop();
  }, []);

  // const handleForceShowSidebarLaptop = useCallback(() => {
  //   const isLaptopWidth = window.innerWidth >= 880;

  //   if (isLaptopWidth) setSidebar(true);
  // }, []);

  return (
    <div className={cx("wrapper")}>
      {/* When click to hamburger icon in header then trigger showSidebar function to sidebar */}
      <Header showSidebar={showSidebar} />
      <div className={cx("container")}>
        <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
        <Content className={cx("content")}>{children}</Content>
        {/* <div className={cx("content")}>{children}</div> */}
      </div>
    </div>
  );
}

// DefaultLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default DefaultLayout;
