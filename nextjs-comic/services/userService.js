import useAxios from '@/hooks/auth/useAxios'
import { makeRequest } from '@/lib/utils/httpRequest'
import axios from 'axios'
const baseURL = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

const useUserApi = () => {
  const { makeAuthRequest } = useAxios()

  const getCurrentUserUrl = {
    fetcher: makeAuthRequest,
    url: 'users/current-user',
  }

  const editProfile = (formData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.post(`${baseURL}users/edit/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token.access}`,
      },
    })
    //   return makeAuthRequest(`users/edit/`, {
    //     method: 'POST',
    //     formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
  }

  const buyChapter = ({ comicSlug, chapterSlug }) => {
    return makeAuthRequest(`comics/${comicSlug}/${chapterSlug}/buy-chapter`, {
      method: 'POST',
    })
  }

  const checkUserChapterPayment = ({ comicSlug, chapterSlug }) => {
    return {
      fetcher: makeAuthRequest,
      url: `comics/${comicSlug}/${chapterSlug}/check-chapter-payment`,
    }
  }

  return {
    checkUserChapterPayment,
    getCurrentUserUrl,
    editProfile,
    buyChapter,
  }
}

export function login({ username, password }) {
  return makeRequest(`api/token/`, {
    method: 'POST',
    data: { username, password },
  })
}

export function register({ username, password, password2 }) {
  return makeRequest(`api/register/`, {
    method: 'POST',
    data: { username, password, password2 },
  })
}

export default useUserApi
