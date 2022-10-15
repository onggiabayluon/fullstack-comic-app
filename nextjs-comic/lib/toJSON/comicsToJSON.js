function comicsToJSON(comics) {
  let isArray = Array.isArray(comics)
  if (!isArray) comics = [comics]
  comics = comics.map((comic) => {
    return {
      ...comic,
      src: comic.thumbnail || '',
      createdDate: comic.created_date,
      updatedDate: comic.updated_date,
    }
  })

  // console.log(comics)

  return isArray ? comics : comics.pop()
}

export default comicsToJSON
