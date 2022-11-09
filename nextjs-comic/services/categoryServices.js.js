import { makeRequest } from '@/lib/utils/httpRequest'

export const defaultOptions = {
  type: 'less',
}

export function getCategoriesFn() {
  return {
    fetcher: makeRequest,
    url: `/categories/`,
  }
}

export function getCategories(params = defaultOptions) {
  return makeRequest(`/categories/`, {
    method: 'GET',
    params: params,
  })
}
