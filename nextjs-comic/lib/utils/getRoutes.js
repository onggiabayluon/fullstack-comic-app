import routes from '@/data/routes'
// Pages
const publicRoutes = {
  home: { path: routes.home },
  comicDetail: {
    path: routes.comicDetail,
    getDynamicPath: (comicSlug) => `/${routes.comicDetail.split('/')[1]}/${comicSlug}`,
  },
  chapterDetail: {
    path: routes.chapterDetail,
    getDynamicPath: (comicSlug, chapterSlug) =>
      `/${routes.chapterDetail.split('/')[1]}/${comicSlug}/${chapterSlug}`,
  },
  categories: {
    path: routes.categories,
    getDynamicPath: (cateName) => `/${routes.categories.split('/')[1]}/${cateName}`,
  },
  login: {
    path: routes.login,
  },
  logout: {
    path: routes.logout,
  },
}

const privateRoutes = []

export { publicRoutes, privateRoutes }
