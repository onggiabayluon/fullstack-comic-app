import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import Header from "./Header";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);
const defaultFnc = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = true,
  isLoginWrapper = false,
  onChange = defaultFnc,
  toggle,
  isShowing,
  width,
}) {
  const [history, setHistory] = useState([{ data: items }]);

  const lastMenuItem = history[history.length - 1];

  const renderItems = () => {
    return lastMenuItem.data.map((item, index) => {
      return (
        <MenuItem
          key={index}
          data={item}
          className={item.className}
          props={
            item.className
              ? { outline: true, black: true, iconLeft: true }
              : null
          }
          onClick={() => {
            const hasChilren = !!item.children;

            // Nếu có children thì đẩy phần tử con vào array
            if (hasChilren) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              // không có thì xử lý item hiện tại
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, history.length - 1));
  };

  return (
    <>
      {isShowing && <div className="modal-overlay"></div>}
      <Tippy
        interactive
        delay={[0, 700]}
        placement="bottom-end"
        {...(toggle ? { visible: isShowing } : (hideOnClick = { hideOnClick }))}
        render={(attrs) => (
          <div
            className={cx("menu-list")}
            tabIndex="-1"
            {...attrs}
            style={{ width: width + "px" }}
          >
            <PopperWrapper
              className={cx("menu-popper")}
              isLoginWrapper={isLoginWrapper}
              toggle={toggle}
              title={lastMenuItem && lastMenuItem.title}
              onBack={lastMenuItem && handleBack}
            >
              {history?.length > 1 && !isLoginWrapper && (
                <Header title={lastMenuItem.title} onBack={handleBack}></Header>
              )}
              <div className={cx("menu-scrollable")}>{renderItems()}</div>
            </PopperWrapper>
          </div>
        )}
        onHide={() => setHistory((prev) => prev.slice(0, 1))}
      >
        {children}
      </Tippy>
    </>
  );
}

export default Menu;
