import { useState } from 'react'

function useComic(initValue) {
  const [comic, setComic] = useState(initValue)

  const getFirstChapter = () => {
    return comic?.chapters?.length ? comic.chapters[0] : null
  }

  const getLastestChapter = () => {
    return comic?.chapters?.length ? comic.chapters[comic.chapters.length - 1] : null
  }

  const getTotalViews = () => {
    let totalViews = 0
    comic?.chapters.forEach((chapter) => (totalViews += chapter.views))
    return totalViews
  }

  const getPrevChapter = (chapter) => {
    const hasPrevChapter = chapter?.chapter_num - 1 === 0 ? false : true
    return hasPrevChapter ? chapter?.chapter_num - 1 : null
  }
  const getNextChapter = (chapter) => {
    return chapter?.chapter_num + 1
  }

  return {
    comic,
    getFirstChapter,
    getLastestChapter,
    getTotalViews,
    getNextChapter,
    getPrevChapter,
  }
}

export default useComic
