import { Fragment } from "react";
import { UserProvider } from "~/contexts/UserContext";
import DefaultLayout, { HeaderOnly } from "~/layouts";

export const layouts = {
  home: {},
  comicDetail: {
    layout: HeaderOnly,
  },
  chapterDetail: {
    layout: HeaderOnly,
  },
  login: {
    layout: HeaderOnly,
  },
  register: {
    layout: HeaderOnly,
  },
  categories: {},
};

function getLayout(selectedLayout, page) {
  // check if layout is specify in publicRoutes || fallback Defaultlayout
  let Layout = selectedLayout || DefaultLayout;

  if (selectedLayout) {
    Layout = selectedLayout;
  } else if (selectedLayout === null) {
    Layout = Fragment;
  }

  return (
    <UserProvider>
      <Layout>{page}</Layout>
    </UserProvider>
  );
}

export default getLayout;
