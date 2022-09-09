import config from "~/config";
import { HeaderOnly } from "~/layouts";

// Layouts

// Pages
const publicRoutes = {
  home: { path: config.routes.home },
  comicDetail: {
    path: config.routes.comicDetail,
    getDynamicPath: (comicSlug) =>
      `/${config.routes.comicDetail.split("/")[1]}/${comicSlug}`,
    layout: HeaderOnly,
  },
  chapterDetail: {
    path: config.routes.chapterDetail,
    getDynamicPath: (comicSlug, chapterSlug) =>
      `/${
        config.routes.chapterDetail.split("/")[1]
      }/${comicSlug}/${chapterSlug}`,
    layout: HeaderOnly,
  },
  categories: {
    path: config.routes.categories,
    getDynamicPath: (cateName) =>
      `/${config.routes.categories.split("/")[1]}/${cateName}`,
  },
};

const privateRoutes = [];

export { publicRoutes, privateRoutes };
