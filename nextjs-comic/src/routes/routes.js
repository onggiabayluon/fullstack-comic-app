// Layouts
import config from "~/config";

// Pages
const publicRoutes = {
  home: { path: config.routes.home },
  comicDetail: {
    path: config.routes.comicDetail,
    getDynamicPath: (comicSlug) =>
      `/${config.routes.comicDetail.split("/")[1]}/${comicSlug}`,
  },
  chapterDetail: {
    path: config.routes.chapterDetail,
    getDynamicPath: (comicSlug, chapterSlug) =>
      `/${
        config.routes.chapterDetail.split("/")[1]
      }/${comicSlug}/${chapterSlug}`,
  },
  categories: {
    path: config.routes.categories,
    getDynamicPath: (cateName) =>
      `/${config.routes.categories.split("/")[1]}/${cateName}`,
  },
  login: {
    path: config.routes.login,
  },
  logout: {
    path: config.routes.logout,
  },
};

const privateRoutes = [];

export { publicRoutes, privateRoutes };
