function chapterToJSON(chapter) {
  return {
    ...chapter,
    images: chapter.images?.map((image) => {
      return { ...image, src: image.thumbnail }
    }),
    createdDate: chapter.created_date,
    updatedDate: chapter.updated_date,
  }
}

export default chapterToJSON
