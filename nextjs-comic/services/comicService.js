import { makeRequest } from '@/lib/utils/httpRequest'

export function getComics() {
  return makeRequest(`/comics`, {
    method: 'GET',
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
