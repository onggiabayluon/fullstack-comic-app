function comicsToJSON(comics) {
  comics = comics.map((comic) => {
    return {
      ...comic,
      src: comic.thumbnail || '',
      createdDate: comic.created_date,
      updatedDate: comic.updated_date,
    }
  })
  return comics
}

export default comicsToJSON
