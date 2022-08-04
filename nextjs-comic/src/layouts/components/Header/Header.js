import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import config from "~/config";
import Button from "~/components/Button";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import Menu from "~/components/Popper/Menu";
import { InboxIcon, MessageIcon, UploadIcon } from "~/components/Icons";
import Search from "../Search";
import Link from "next/link";
import Image from "next/image";
import { memo, useEffect } from "react";
import { MENU_ITEMS, userMenu } from "~/config/HeaderMenuItems";
const cx = classNames.bind(styles);

const defaultFnc = () => {};

function Header({ showSidebar = defaultFnc }) {
  useEffect(() => {
    console.log("header");
  });
  const currentUser = true;

  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "language":
        // Handle change language
        break;
      default:
    }
  };

  const handleHamburgerClick = () => {
    showSidebar();
  };

  return (
    <header className={cx("wrapper")}>
      {/* Hamburger */}
      <div className={cx("hamburger")} onClick={handleHamburgerClick}>
        <FontAwesomeIcon className={cx("hamburger-icon")} icon={faBars} />
      </div>

      {/* Logo */}
      <Link href={config.routes.home}>
        <a className={cx("logo-link")}>
          <Image src={images.logo} alt="Tiktok" />
        </a>
      </Link>

      <div className={cx("inner")}>
        {/* Search */}
        <Search />

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
              <Button primary>Log in</Button>
            </>
          )}

          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <span className={cx("user-avatar-wrapper")} tabIndex="0">
                <Image
                  className={cx("user-avatar")}
                  src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80&w=auto&h=40"
                  alt="Nguyen Van A"
                  width={32}
                  height={32}
                />
              </span>
            ) : (
              <button className={cx("more-btn")}>
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
