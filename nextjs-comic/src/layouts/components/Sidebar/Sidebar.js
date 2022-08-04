import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu, { MenuItem } from "./Menu";
import { sidebarItems as MY_SIDEBAR_ITEMS } from "~/config/SidebarItems";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const MENU_ITEMS = MY_SIDEBAR_ITEMS;

function Sidebar({ setSidebar, sidebar }) {
  useEffect(() => {
    // handleHideSidebar();
    const handler = window.addEventListener("resize", handleHideSidebar);

    return () => handler;
  });

  const handleHideSidebar = () => {
    const width = window.innerWidth;

    if (width <= 880) setSidebar(false);
  };

  return (
    <aside className={cx("sidebar", sidebar ? "open" : "")}>
      <div className={cx("middle-sidebar")}>
        {/* <div className={cx("sidebar__title")}>Menu</div> */}
        <Menu className={cx("sidebar__list")}>
          {MENU_ITEMS.map((item, key) => {
            return (
              <MenuItem
                className={cx(sidebar ? "menu-item--detail" : "")}
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
}

export default Sidebar;
