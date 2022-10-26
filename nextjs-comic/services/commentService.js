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
export const getCommentByComicSlugUrl = (slug) => {
  return {
    fetcher: makeRequest,
    url: (slug) => `/comics/${slug}/comments/`,
  }
}

export function getCommentByComicSlug({ slug, params, signal }) {
  return makeRequest(`/comics/${slug}/comments/`, {
    method: 'GET',
    params: params,
    signal,
  })
}

export default useCommentApi
