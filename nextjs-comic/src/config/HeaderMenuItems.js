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

export const LOGIN_ITEMS = [
  {
    icon: (
      <FontAwesomeIcon width={20} height={20} icon={faUser}></FontAwesomeIcon>
    ),
    title: "Use email / username",
    className: "login-btn",
    children: {
      title: "Log in",
      data: [
        {
          type: "Login",
          comp: LoginForm,
        },
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
];

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
