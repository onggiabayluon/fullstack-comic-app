function commentsToJson(comments, comicSlug) {
  let isArray = Array.isArray(comments)
  if (!isArray) comments = [comments]
  comments = comments.map((comment) => {
    return {
      ...comment,
      comicSlug: comicSlug,
    }
  })

  // console.log(comments)

  return isArray ? comments : comments.pop()
}

export default commentsToJson
