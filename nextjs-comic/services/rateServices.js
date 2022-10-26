import useAxios from '@/hooks/auth/useAxios'

const useRateApi = () => {
  const { makeAuthRequest } = useAxios()

  function createOrUpdateRating({ rating, comicSlug }) {
    return makeAuthRequest(`comics/${comicSlug}/rating/`, {
      method: 'POST',
      data: { rating },
    })
  }

  return {
    createOrUpdateRating,
  }
}

export default useRateApi
