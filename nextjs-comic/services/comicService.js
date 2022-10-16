import { makeRequest } from '@/lib/utils/httpRequest'

const defaultOptions = {
  type: 'less',
}

export const getURLComics = () => '/comics/'
export const getURLComicBySlug = (slug) => `/comics/${slug}/`

export function getComics({ params = defaultOptions, signal }) {
  return makeRequest(`/comics/`, {
    method: 'GET',
    params: params,
    signal,
  })
}

export function getChapters(params = defaultOptions) {
  return makeRequest(`/chapters/`, {
    method: 'GET',
    params: params,
  })
}

export function getComicBySlug(slug, params = defaultOptions) {
  return makeRequest(`/comics/${slug}/`, {
    method: 'GET',
    params: params,
  })
}

export function getChapterDetail(comicSlug, chapterSlug, params = defaultOptions) {
  return makeRequest(`/comics/${comicSlug}/${chapterSlug}`, {
    method: 'GET',
    params: params,
  })
}

export function incChapterViews(comicSlug, chapterSlug, params = defaultOptions) {
  return makeRequest(`/comics/${comicSlug}/${chapterSlug}/views`, {
    method: 'GET',
    params: params,
  })
}
