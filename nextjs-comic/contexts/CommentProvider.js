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
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetched, setHasFetched] = useState(false)
  const router = useRouter()
  const {
    query: { comicSlug },
  } = router

  // Fetch comments for the first time
  useEffect(() => {
    if (!hasFetched) {
      getCommentByComicSlug(comicSlug)
        .then((comments) => {
          setComments(commentsToJson(comments.results, comicSlug))
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
        .finally(setHasFetched(true))
    }
  }, [comicSlug, hasFetched])

  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach((comment) => {
      group[comment.reply_to] ||= []
      group[comment.reply_to].push(comment)
    })
    return group
  }, [comments])

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
        getReplies,
        createLocalComment,
        isLoading,
        updateLocalComment,
        deleteLocalComment,
        // toggleLocalCommentLike,
      }}
    >
      {children}
    </Context.Provider>
  )
}
