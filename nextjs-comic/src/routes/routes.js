import config from "~/config";
import DefaultLayout from "~/layouts";

// Layouts
import { HeaderOnly } from "~/layouts";

// Pages

const publicRoutes = {
  home: { path: config.routes.home },
  comicDetail: { path: config.routes.comicDetail },
};

const privateRoutes = [];

export { publicRoutes, privateRoutes };
