import CommentForm from '@/components/Comment/CommentForm'
import CommentList from '@/components/Comment/CommentList'
import Image from '@/components/common/Image'
import { useCommentContext } from '@/contexts/CommentProvider'
import { useAsyncFn } from '@/hooks/useAsync'
import { useAuthContext } from '@/hooks/useAuthContext'
import { formatTimeAgo } from '@/lib/utils/dateFormatter'
import useCommentApi from '@/services/commentService'
import { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import IconBtn from '../Buttons/IconBtn'
import TextTruncate from '../Utilities/TextTruncate'

function Comment({
  id,
  comicSlug,
  content: message,
  creator: user,
  updated_date: updatedAt,
  likeCount,
  likedByMe,
}) {
  const { state: currentUser } = useAuthContext()
  const [areChildrenHidden, setAreChildrenHidden] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { createComment, deleteComment, updateComment } = useCommentApi()
  const { getReplies, createLocalComment, deleteLocalComment, updateLocalComment } =
    useCommentContext()
  const childComments = getReplies(id)

  const createCommentFn = useAsyncFn(createComment)
  const updateCommentFn = useAsyncFn(updateComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  // const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)

  const oncommentReply = (message) => {
    return createCommentFn
      .execute({ comicSlug: comicSlug, content: message, reply_to: id })
      .then((reply) => {
        setIsReplying(false)
        createLocalComment(reply)
      })
  }

  function onCommentDelete() {
    if (window.confirm('Are you sure you wish to delete this item?'))
      return deleteCommentFn.execute({ id }).then((res) => {
        if (res?.status == 204) deleteLocalComment(id)
      })
  }

  function onCommentUpdate(message) {
    return updateCommentFn.execute({ id, content: message }).then((res) => {
      if (res) {
        setIsEditing(false)
        updateLocalComment(res.id, res.content)
      }
    })
  }

  // function onToggleCommentLike() {
  //   return toggleCommentLikeFn
  //     .execute({ id, postId: post.id })
  //     .then(({ addLike }) => toggleLocalCommentLike(id, addLike))
  // }
  return (
    <div className="comic-detail-section-border flex flex-col bg-dark-gray-lighter p-4 dark:bg-dark-blue">
      <div className="flex flex-col space-y-3">
        {/* User Info */}
        <div className="flex flex-row">
          <div className="mr-2 h-9 w-9">
            <Image
              className="h-9 w-9 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user avatar"
              width={34}
              height={34}
            />
          </div>
          <div className="leading-2 flex flex-col">
            <span className="text-sm">{user.username}</span>
            <span className="text-xs text-dark-gray-darker">about {formatTimeAgo(updatedAt)}</span>
          </div>
        </div>
        {/* User Comment Text */}
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <TextTruncate text={message} className="prose-sm my-5" />
        )}

        {/* Actions Section */}
        <div className="flex flex-row space-x-3">
          <IconBtn
            disabled={true}
            // onClick={onToggleCommentLike}
            // disabled={toggleCommentLikeFn.loading}
            // Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? 'Unlike' : 'Like'}
            Icon={LikeIcon}
          >
            <span className="ml-1 text-sm">{likeCount || 0}</span>
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={ReplyIcon}
            aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
          ></IconBtn>
          {user.id === currentUser?.user_id && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                aria-label={isEditing ? 'Cancel Edit' : 'Edit'}
                Icon={EditIcon}
              ></IconBtn>
              <IconBtn
                disabled={deleteCommentFn.loading}
                onClick={onCommentDelete}
                aria-label="Delete"
                color="danger"
                Icon={DeleteIcon}
              ></IconBtn>
            </>
          )}
        </div>

        {isReplying && (
          <div className="mt-2 ml-3">
            <CommentForm
              autoFocus
              onSubmit={oncommentReply}
              loading={createCommentFn.loading}
              error={createCommentFn.error}
            />
          </div>
        )}

        {/* Show/Hide Replies Button */}
        {childComments?.length > 0 && (
          <>
            <IconBtn
              aria-label={areChildrenHidden ? 'Show Replies' : 'Hide Replies'}
              Icon={areChildrenHidden ? FaCaretDown : FaCaretUp}
              onClick={() => setAreChildrenHidden(!areChildrenHidden)}
            >
              <span className={`text-base font-bold uppercase tracking-wide`}>
                {childComments.length} Replies
              </span>
            </IconBtn>
          </>
        )}

        {/* Child comments */}
        {childComments?.length > 0 && (
          <>
            <div className={`nested-comments-stack ${areChildrenHidden ? 'hide' : ''}`}>
              {/* <button
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              /> */}
              <div className="nested-comments">
                <CommentList comments={childComments} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function LikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
      />
    </svg>
  )
}
function ReplyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  )
}
function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  )
}
function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  )
}

export default Comment
