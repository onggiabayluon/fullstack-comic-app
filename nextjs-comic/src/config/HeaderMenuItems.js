import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "~/components/LoginForm";
import Footer from "~/components/Popper/Menu/Footer";

export const LOGIN_FOOTER = {
  title: "Login",
  description: "Already have an account?",
  type: "footer",
  isBackToRoot: true,
  comp: Footer,
};

export const SIGNUP_ITEMS = [
  {
    icon: (
      <FontAwesomeIcon
        width={20}
        height={20}
        icon={faFacebook}
      ></FontAwesomeIcon>
    ),
    title: "test children register",
    className: "login-btn",
  },
  //Footer
  LOGIN_FOOTER,
];

export const SIGNUP_FOOTER = {
  title: "Sign up",
  description: "Don’t have an account?",
  type: "footer",
  comp: Footer,
  children: {
    title: "Sign up",
    data: SIGNUP_ITEMS,
  },
};
export const LOGIN_ITEMS = [
  {
    icon: (
      <FontAwesomeIcon width={20} height={20} icon={faUser}></FontAwesomeIcon>
    ),
    title: "Use email / username",
    className: "login-btn",
    children: {
      title: "Login",
      data: [
        {
          type: "login",
          comp: LoginForm,
        },
        //Footer
        SIGNUP_FOOTER,
      ],
    },
  },
  {
    icon: (
      <FontAwesomeIcon width={20} height={20} icon={faGoogle}></FontAwesomeIcon>
    ),
    title: "Continue with Google",
    className: "login-btn",
  },
  {
    icon: (
      <FontAwesomeIcon
        width={20}
        height={20}
        icon={faFacebook}
      ></FontAwesomeIcon>
    ),
    title: "Continue with Facebook",
    className: "login-btn",
  },

  //Footer
  SIGNUP_FOOTER,
];

export const AUTHENTICATION_ITEMS = [...LOGIN_ITEMS];

export const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

export const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "View profile",
    to: "/@hoaa",
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: "Get coins",
    to: "/coin",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Settings",
    to: "/settings",
  },
  ...MENU_ITEMS,
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: "Log out",
    to: "/logout",
    separate: true,
  },
];
