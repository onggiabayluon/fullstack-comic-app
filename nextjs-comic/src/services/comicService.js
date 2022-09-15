import { makeRequest } from "~/utils/httpRequest";

export function getComics() {
  return makeRequest(`/comics`, {
    method: "GET",
  });
}

export function getComicBySlug(slug) {
  return makeRequest(`/comics/${slug}`, {
    method: "GET",
    params: {
      test: true,
    },
  });
}
// export function getComics({ comicId, message, parentId }) {
//   const {data, error, mutate} = useSWR(`comics`, fetcher)

//   return {
//     data: data,
//     isLoading: !data,
//     isError: !!error,
//     mutate,
//   };
// }
