import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "~/assets/scss/login.module.scss";
import MyImage from "~/components/MyImage";
import Section from "~/components/Section";
import { layouts } from "~/utils/getLayout";

const cx = classNames.bind(styles);

function login() {
  return (
    <>
      <Section container>
        <div className={cx("screen")}>
          <FontAwesomeIcon className={cx("svg")} icon={faAngleLeft} />
          <div className={cx("heading")}>Welcome Back</div>
          <div className={cx("ripple")}>
            <MyImage src={"/Ripple.png"} width={260} height={262.81}></MyImage>
          </div>
        </div>
        <h1 className={cx("color")}>login page</h1>
      </Section>
      <script></script>
    </>
  );
}

export default login;

login.layout = layouts.login.layout;
