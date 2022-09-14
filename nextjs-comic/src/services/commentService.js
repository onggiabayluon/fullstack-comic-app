import { makeRequest } from "~/utils/httpRequest";

export function createComment({
  comicSlug,
  message: content,
  parentId: reply_to,
}) {
  return makeRequest(`comics/${comicSlug}/add-comment/`, {
    method: "POST",
    data: { content, reply_to },
    // header:
  });
}
