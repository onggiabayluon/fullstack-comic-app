import ComicDetail from "~/layouts/components/ComicDetail";
import { publicRoutes } from "~/routes";

function ComicDetailPage() {
  return <ComicDetail />;
}

ComicDetailPage.layout = publicRoutes.comicDetail.layout;

export default ComicDetailPage;
