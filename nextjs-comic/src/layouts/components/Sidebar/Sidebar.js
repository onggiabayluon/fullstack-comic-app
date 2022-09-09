import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu, { MenuItem } from "./Menu";
import { sidebarItems as MY_SIDEBAR_ITEMS } from "~/config/SidebarItems";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const cx = classNames.bind(styles);
const MENU_ITEMS = MY_SIDEBAR_ITEMS;

// eslint-disable-next-line react/display-name
const Sidebar = forwardRef((props, sidebarRef) => {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  // Add new method to ref: toggleSidebar()
  useImperativeHandle(sidebarRef, () => ({
    toggleSidebar,
  }));

  useEffect(() => {
    const handleHideSidebar = () => {
      const width = window.innerWidth;

      if (width <= 880) setShow(false);
    };
    const handler = window.addEventListener("resize", handleHideSidebar);
    console.log("sidebar");

    return () => handler;
  });

  return (
    <aside ref={sidebarRef} className={cx("sidebar", show ? "open" : "")}>
      <div className={cx("middle-sidebar")}>
        {/* <div className={cx("sidebar__title")}>Menu</div> */}
        <Menu className={cx("sidebar__list")}>
          {MENU_ITEMS.map((item, key) => {
            return (
              <MenuItem
                className={cx(show ? "menu-item--detail" : "")}
                key={key}
                title={item.title}
                to={item.to}
                icon={item.icon}
                activeIcon={item.activeIcon}
              />
            );
          })}
        </Menu>
      </div>
      {/* <div className={cx("middle-sidebar")}>
        <div className={cx("sidebar__title")}>Your Favourites</div>
        <Menu className={cx("sidebar__list")}>
          {MENU_ITEMS.map((item, key) => {
            return (
              <MenuItem
                className={cx(open ? "menu-item--detail" : "")}
                key={key}
                title={item.title}
                to={item.to}
                icon={item.icon}
                activeIcon={item.activeIcon}
              />
            );
          })}
        </Menu>
      </div> */}
    </aside>
  );
});

export default Sidebar;
