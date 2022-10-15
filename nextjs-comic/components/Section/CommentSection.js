import { useCommentContext } from '@/contexts/CommentProvider'
import { useAsyncFn } from '@/hooks/useAsync'
import useCommentApi from '@/services/commentService'
import { useEffect } from 'react'
import CommentForm from '../Comment/CommentForm'
import CommentList from '../Comment/CommentList'
// import CommentList from '../Comment/CommentList'

function CommentSection({ className, comicSlug }) {
  useEffect(() => {
    console.log('CommentSection re render')
  })

  // const commentSectionRef = useRef(null)
  // const { isOnScreen } = useOnScreenOnce(commentSectionRef)

  const { rootComments, createLocalComment, isLoading } = useCommentContext()

  // CRUD Commnent function
  const { createComment } = useCommentApi()
  const { loading: isCommentCreating, error, execute: createCommentFn } = useAsyncFn(createComment)

  function onCommentCreate(message) {
    return createCommentFn({
      comicSlug: comicSlug,
      content: message,
    }).then(createLocalComment)
  }

  return (
    <section className={className} aria-label="Comment Section">
      {isLoading ? (
        <div className="comic-detail-section-styles mt-4 p-4 text-center">
          <span className="text-sm">Getting Comments...</span>
        </div>
      ) : (
        <>
          <div className="comic-detail-section-styles mt-4 mb-8 p-4">
            <CommentForm loading={isCommentCreating} error={error} onSubmit={onCommentCreate} />
          </div>
          <div className="comic-detail-section-styles mt-4 p-4">
            {rootComments != null && rootComments.length > 0 ? (
              <CommentList comments={rootComments}></CommentList>
            ) : (
              <div className="comic-detail-section-styles mt-4 p-4 text-center">
                <span className="text-sm">No one has commented on this thread</span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default CommentSection
