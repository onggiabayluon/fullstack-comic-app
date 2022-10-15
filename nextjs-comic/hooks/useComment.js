import { useEffect, useMemo, useState } from 'react'

// const COMMENT_ACTIONS = {
//   CREATE_COMMENT: 'CREATE_COMMENT',
//   DELETE_COMMENT: 'DELETE_COMMENT',
//   UPDATE_COMMENT: 'UPDATE_COMMENT',
// }

// export const commentReducer = (comments, action) => {
//   const { type, payload } = action

//   switch (type) {
//     case COMMENT_ACTIONS.CREATE_COMMENT:
//       return [payload, ...comments]
//     case COMMENT_ACTIONS.DELETE_COMMENT:
//       return comments.filter((comment) => comment.id !== payload.filteredId)
//     case COMMENT_ACTIONS.UPDATE_COMMENT:
//       return
//     default:
//       throw new Error(`Unknown action type: ${action.type}`)
//   }
// }

function useComment(initComments) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (initComments?.results == null) return
    setComments(initComments?.results)
  }, [initComments?.results])

  // // Fetch comments for the first time
  // useUpdateEffect(() => {
  //   if (isOnScreen) {
  //     getCommentByComicSlug(comicSlug)
  //       .then((comments) => {
  //         setComments(comments.results)
  //         setIsLoading(false)
  //       })
  //       .catch((err) => {
  //         setIsLoading(false)
  //         console.log(err)
  //       })
  //   }
  // }, [comicSlug, isOnScreen])

  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach((comment) => {
      // Nếu chưa có group[1] thì sẽ khởi tạo [] và push, có rồi thì ko tạo [] và chỉ push
      group[comment.reply_to] ||= []
      group[comment.reply_to].push(comment)
    })
    return group
  }, [comments])

  const getReplies = (parentId) => {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments]
    })
  }

  return {
    rootComments: commentsByParentId[null],
    createLocalComment,
    getReplies,
  }
}

export default useComment
