import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);

function Wrapper({
  children,
  toggle,
  isLoginWrapper,
  className,
  title,
  onBack,
}) {
  return isLoginWrapper ? (
    <LoginWrapper
      className={className}
      toggle={toggle}
      title={title}
      onBack={onBack}
    >
      {children}
    </LoginWrapper>
  ) : (
    <NormWrapper className={className}>{children}</NormWrapper>
  );
}

function LoginWrapper(props) {
  return (
    <div className={cx(props.className)}>
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              onClick={props.toggle}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-info">
            {props.title && props.onBack && (
              <button className={"back-btn icon"} onClick={props.onBack}>
                <FontAwesomeIcon
                  width={20}
                  height={20}
                  icon={faChevronLeft}
                  size="lg"
                />
              </button>
            )}
            <h2 className="text-center">{props.title || "Login"}</h2>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
function NormWrapper(props) {
  return <div className={cx("wrapper", props.className)}>{props.children}</div>;
}

export default Wrapper;
