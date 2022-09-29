import { makeRequest } from '@/lib/utils/httpRequest'

const defaultOptions = {
  type: 'less',
}

export function getComics(params = defaultOptions) {
  return makeRequest(`/comics`, {
    method: 'GET',
    params: params,
  })
}

export function getComicBySlug(slug) {
  return makeRequest(`/comics/${slug}`, {
    method: 'GET',
    params: {
      test: true,
    },
  })
}
