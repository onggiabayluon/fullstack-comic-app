import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Button from "~/components/Button";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, className, props }) {
  const Comp = data.comp;
  const classes = cx("menu-item", {
    [className]: className,
    separate: data.separate,
  });
  const footerData = {
    title: data.title,
    description: data.description,
    onClick: onClick,
  };
  // Login or register Comp
  return Comp ? (
    <Comp {...(data.type == "footer" && { ...footerData })}></Comp>
  ) : (
    <Button
      className={classes}
      leftIcon={data.icon}
      href={data.to}
      onClick={onClick}
      {...props}
    >
      {data.title}
    </Button>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
