import useAxios from '@/hooks/auth/useAxios'

const useBookmarkApi = () => {
  const { makeAuthRequest } = useAxios()

  function createOrUpdateBookmark({ comicSlug }) {
    return makeAuthRequest(`comics/${comicSlug}/bookmark/`, {
      method: 'POST',
    })
  }
  function getUserBookmarks() {
    return makeAuthRequest(`users/current-user-bookmarks/`, {
      method: 'GET',
    })
  }
  const getUserBookmarksUrl = {
    fetcher: makeAuthRequest,
    url: 'users/current-user-bookmarks/',
  }

  return {
    createOrUpdateBookmark,
    getUserBookmarks,
    getUserBookmarksUrl,
  }
}

export default useBookmarkApi
