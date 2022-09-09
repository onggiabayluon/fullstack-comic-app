import { useEffect, useMemo, useState } from "react";
import { comic as comicDummy } from "~/utils/dummyData";

function useComic() {
  const [comic, setComic] = useState(comicDummy);
  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      // Nếu chưa có group[1] thì sẽ khởi tạo [] và push, có rồi thì push
      group[comment.reply_to] ||= [];
      group[comment.reply_to].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId) => {
    return commentsByParentId[parentId];
  };

  useEffect(() => {
    if (comic?.comments == null) return;
    setComments(comic.comments);
  }, [comic?.comments]);

  return {
    comic,
    rootComments: commentsByParentId[null],
    getReplies,
  };
}

export default useComic;
