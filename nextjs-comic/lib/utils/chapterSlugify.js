function chapterSLugify(chapter_num) {
  if (!chapter_num) return
  const chapterString = `chapter ${chapter_num}`
  return chapterString
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default chapterSLugify
