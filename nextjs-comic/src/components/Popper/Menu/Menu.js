import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import MenuItem from "./MenuItem";
import styles from "./Menu.module.scss";
import { useState } from "react";
import Header from "./Header";

const cx = classNames.bind(styles);
const defaultFnc = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = true,
  onChange = defaultFnc,
}) {
  const [history, setHistory] = useState([{ data: items }]);

  const lastMenuItem = history[history.length - 1];

  const renderItems = () => {
    return lastMenuItem.data.map((item, index) => {
      return (
        <MenuItem
          key={index}
          data={item}
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
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
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
  );
}

export default Menu;
