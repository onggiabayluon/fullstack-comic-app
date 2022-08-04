import routes from "~/config/routes";
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon,
} from "~/components/Icons";

export const sidebarItems = [
  {
    title: "Home",
    to: routes.home,
    icon: <HomeIcon />,
    activeIcon: <HomeActiveIcon />,
  },
  {
    title: "Following",
    to: routes.comicDetail,
    icon: <UserGroupIcon />,
    activeIcon: <UserGroupActiveIcon />,
  },
  {
    title: "LIVE",
    to: routes.chapterDetail,
    icon: <LiveIcon />,
    activeIcon: <LiveActiveIcon />,
  },
];
