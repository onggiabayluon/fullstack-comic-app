import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";

import images from "~/assets/images";
import Button from "~/components/Button";
import MyImage from "~/components/MyImage";
import Menu from "~/components/Popper/Menu";
import config from "~/config";
import Search from "../Search";
import styles from "./Header.module.scss";

import Link from "next/link";
import { memo, useContext, useEffect, useRef } from "react";
import { InboxIcon, MessageIcon, UploadIcon } from "~/components/Icons";
import {
  AUTHENTICATION_ITEMS,
  MENU_ITEMS,
  userMenu,
} from "~/config/HeaderMenuItems";
import UserContext from "~/contexts/UserContext";
import useModal from "~/hooks/useModel";
const cx = classNames.bind(styles);

function Header({ sidebarRef, hasHamburger = true }) {
  const { user: currentUser } = useContext(UserContext);
  const logoRef = useRef(null);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    console.log("header");
  });

  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "language":
        // Handle change language
        break;
      default:
    }
  };

  const handleHamburgerClick = () => sidebarRef.current?.toggleSidebar();

  const toggleLogoState = (searchExpand) => {
    // Search expand then remove logo
    if (searchExpand) {
      logoRef.current.classList.add("flex-hidden");
    } else {
      logoRef.current.classList.remove("flex-hidden");
    }
  };

  return (
    <header className={cx("wrapper")}>
      {/* Hamburger */}
      {hasHamburger && (
        <div className={cx("hamburger")} onClick={handleHamburgerClick}>
          <FontAwesomeIcon className={cx("hamburger-icon")} icon={faBars} />
        </div>
      )}
      {!hasHamburger && <div className={cx("hamburger", "no-cursor")}></div>}
      {/* Logo */}
      <Link href={config.routes.home}>
        <a ref={logoRef} className={cx("logo-link")}>
          <MyImage src={images.logo} alt="Tiktok" />
        </a>
      </Link>
      <div className={cx("inner")}>
        {/* Search */}
        <Search toggleLogoStateBySearchState={toggleLogoState} />

        {/* Profile Menu */}
        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                <button className={cx("action-btn")}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx("action-btn")}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx("action-btn")}>
                  <InboxIcon />
                  <span className={cx("badge")}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Menu
                items={AUTHENTICATION_ITEMS}
                onChange={handleMenuChange}
                isLoginWrapper
                toggle={toggle}
                isShowing={isShowing}
                width="460"
              >
                <div id="parent">
                  <Button primary onClick={toggle}>
                    Log in
                  </Button>
                </div>
              </Menu>
            </>
          )}

          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <span className={cx("user-avatar-wrapper")} tabIndex="0">
                <MyImage
                  className={cx("user-avatar")}
                  src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80&w=auto&h=40"
                  alt={currentUser.username}
                  width={32}
                  height={32}
                  hasBlur={false}
                />
              </span>
            ) : (
              <button className={cx("more-btn", "svg")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
