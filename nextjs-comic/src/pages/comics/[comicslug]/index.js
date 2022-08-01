import { publicRoutes } from "~/routes";

function ComicDetailPage() {
  return (
    <main>
      <h1>comic detail page</h1>
    </main>
  );
}

ComicDetailPage.layout = publicRoutes.comicDetail.layout;

export default ComicDetailPage;
