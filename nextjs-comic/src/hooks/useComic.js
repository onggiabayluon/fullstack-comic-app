import { useEffect, useMemo, useState } from "react";

function useComic(initValue) {
  const [comic, setComic] = useState(initValue);
  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      // Nếu chưa có group[1] thì sẽ khởi tạo [] và push, có rồi thì ko tạo [] và chỉ push
      group[comment.reply_to] ||= [];
      group[comment.reply_to].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId) => {
    return commentsByParentId[parentId];
  };

  const getFirstChapter = () => {
    return comic?.chapters?.length ? comic.chapters[0] : null;
  };

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  useEffect(() => {
    if (comic?.comments == null) return;
    setComments(comic.comments);
  }, [comic?.comments]);

  return {
    comic,
    rootComments: commentsByParentId[null],
    getReplies,
    getFirstChapter,
    createLocalComment,
  };
}

export default useComic;
