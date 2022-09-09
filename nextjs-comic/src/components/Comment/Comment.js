import { formatDate } from "~/utils/dateFormatter";

function Comment({
  id,
  content,
  creator: user,
  created_date: createdAt,
  likeCount,
  likedByMe,
}) {
  return (
    <div className="comment">
      <div className="header">
        <span className="name">{user.name}</span>
        <span className="date">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default Comment;
