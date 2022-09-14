import ComicDetail from "~/layouts/components/ComicDetail";
import { layouts } from "~/utils/getLayout";

function ComicDetailPage() {
  return <ComicDetail />;
}

ComicDetailPage.layout = layouts.comicDetail.layout;

export default ComicDetailPage;
