import { Fragment } from "react";
import DefaultLayout from "~/layouts";

function getLayout(selectedLayout, page) {
  // check if layout is specify in publicRoutes || fallback Defaultlayout
  let Layout = selectedLayout || DefaultLayout;

  if (selectedLayout) {
    Layout = selectedLayout;
  } else if (selectedLayout === null) {
    Layout = Fragment;
  }

  return <Layout>{page}</Layout>;
}

export default getLayout;
