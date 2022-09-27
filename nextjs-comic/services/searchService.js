import * as httpRequest from '@/lib/utils/httpRequest'

export function getComics(q, type = 'less') {
  return httpRequest.makeRequest(`/comics`, {
    method: 'GET',
    params: {
      q,
      type,
    },
  })
}

export const search = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get('comics', {
      params: {
        q,
        type,
      },
    })
    return res.results //the api return the results (array)
  } catch (error) {
    console.log(error)
  }
}
