import { useState } from "react";
import useComic from "~/hooks/useComic";

import { formatDate } from "~/utils/dateFormatter";
import CommentList from "../CommentList";

function Comment({
  id,
  content: message,
  creator: user,
  created_date: createdAt,
  likeCount,
  likedByMe,
}) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const { getReplies } = useComic();
  const childComments = getReplies(id);

  return (
    <>
      {/* Parent Comment */}
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">{formatDate(createdAt)}</span>
        </div>

        <div className="message">{message}</div>

        {/* <div className="footer">
          <IconBtn
            onClick={onToggleCommentLike}
            disabled={toggleCommentLikeFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                disabled={deleteCommentFn.loading}
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
        </div> */}
      </div>

      {/* Child comments */}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}

export default Comment;
