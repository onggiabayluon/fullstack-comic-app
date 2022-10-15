import { memo } from 'react'
import Comment from './Comment'

function CommentList({ comments }) {
  return comments.map((comment) => (
    <div key={comment.id} className="comment-stack">
      <Comment {...comment} />
    </div>
  ))
}

export default memo(CommentList)
