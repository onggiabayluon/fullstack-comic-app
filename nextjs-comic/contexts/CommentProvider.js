import constant from '@/data/constants'
import usePaginatedQuery from '@/hooks/usePaginatedQuery'
import commentsToJson from '@/lib/toJSON/commentsToJson'
import { getCommentByComicSlug } from '@/services/commentService'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
const Context = React.createContext()

export function useCommentContext() {
  return useContext(Context)
}

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetched, setHasFetched] = useState(false)
  const router = useRouter()
  const {
    query: { comicSlug },
  } = router

  const commentsByParentId = useMemo(() => {
    const group = {}
    commentsToJson(comments, comicSlug)
    comments.forEach((comment) => {
      group[comment.reply_to] ||= []
      group[comment.reply_to].push(comment)
    })
    return group
  }, [comments, comicSlug])

  // Paginate Comments
  const options = { type: 'less' }
  const params = { slug: comicSlug }
  const {
    currentPage,
    setCurrentPage,
    loading: isFetchingNextComment,
    error: isErrorFetchingNextComment,
  } = usePaginatedQuery(setComments, getCommentByComicSlug, params, options)

  // set Initial comment by fetching comments for the first time
  useEffect(() => {
    if (!hasFetched) {
      getCommentByComicSlug({ slug: comicSlug })
        .then((res) => {
          setTotalRecords(res.count)
          setComments(res.results)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
        .finally(setHasFetched(true))
    }
  }, [comicSlug, hasFetched])

  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments]
    })
  }

  function deleteLocalComment(id) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id != id)
    })
  }

  function updateLocalComment(id, message) {
    setComments((prevComments) => {
      const newComments = prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: message }
        } else {
          return comment
        }
      })
      return newComments
    })
  }

  return (
    <Context.Provider
      value={{
        rootComments: commentsByParentId[null],
        currentPage,
        setCurrentPage,
        pageSize: constant.COMMENT_LIMIT,
        isFetchingNextComment,
        isErrorFetchingNextComment,
        getReplies,
        createLocalComment,
        isLoading,
        updateLocalComment,
        deleteLocalComment,
        totalRecords,
        // toggleLocalCommentLike,
      }}
    >
      {children}
    </Context.Provider>
  )
}
