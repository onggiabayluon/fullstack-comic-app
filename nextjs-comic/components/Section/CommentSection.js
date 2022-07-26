import CommentForm from '@/components/Comment/CommentForm'
import CommentList from '@/components/Comment/CommentList'
import Pagination from '@/components/common/Pagination'
import PictureGroupSkeleton from '@/components/Skeleton/PictureGroupSkeleton'
import SkeletonList from '@/components/Skeleton/SkeletonList'
import { useCommentContext } from '@/contexts/CommentProvider'
import { useAsyncFn } from '@/hooks/useAsync'
import useCommentApi from '@/services/commentService'
import { useEffect } from 'react'

function CommentSection({ className, comicSlug }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('CommentSection re render')
  })
  const {
    rootComments,
    currentPage,
    setCurrentPage,
    pageSize,
    isFetchingNextComment,
    isErrorFetchingNextComment,
    createLocalComment,
    isLoading,
    totalRecords,
  } = useCommentContext()

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
            {isFetchingNextComment ? (
              <SkeletonList
                Component={PictureGroupSkeleton}
                className="my-4"
                height={144}
                pageSize={pageSize}
                isError={isErrorFetchingNextComment && true}
                hasIcon={false}
              />
            ) : rootComments != null && rootComments.length > 0 ? (
              <CommentList comments={rootComments}></CommentList>
            ) : (
              <div className="comic-detail-section-styles mt-4 p-4 text-center">
                <span className="text-sm">No one has commented on this thread</span>
              </div>
            )}
          </div>
        </>
      )}

      {rootComments != null && rootComments.length > 0 ? (
        <Pagination
          className="pagination-bar mt-4"
          currentPage={currentPage}
          totalCount={totalRecords}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          isLoading={isLoading || isCommentCreating || isFetchingNextComment}
        />
      ) : null}
    </section>
  )
}

export default CommentSection
