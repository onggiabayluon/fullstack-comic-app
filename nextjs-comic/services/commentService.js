import useAxios from '@/hooks/auth/useAxios'
import { makeRequest } from '@/lib/utils/httpRequest'

const useCommentApi = () => {
  const { makeAuthRequest } = useAxios()

  function createComment({ comicSlug, content, reply_to }) {
    return makeAuthRequest(`comics/${comicSlug}/add-comment/`, {
      method: 'POST',
      data: { content, reply_to },
    })
  }

  function deleteComment({ id: commentId }) {
    return makeAuthRequest(`comments/${commentId}/`, {
      method: 'DELETE',
    })
  }

  function updateComment({ id: commentId, content }) {
    return makeAuthRequest(`comments/${commentId}/`, {
      method: 'PUT',
      data: { content },
    })
  }

  return {
    createComment,
    deleteComment,
    updateComment,
  }
}

export function getCommentByComicSlug(slug, params) {
  return makeRequest(`/comics/${slug}/comments/`, {
    method: 'GET',
    params: params,
  })
}

export default useCommentApi
