function ChapterList({
  comic = [],
  limit,
  hasBorder,
  Component,
  href,
  ...passProps
}) {
  return comic.chapters
    ? comic.chapters.slice(0, limit).map((chapter, index) => (
        <Component
          key={chapter.id}
          comic={comic}
          chapter={chapter}
          index={index + 1}
          {...passProps}
          {...(hasBorder && {
            ...((index == 0 || index == 1) && { borderTop: true }),
          })}
        />
      ))
    : null;
}

export default ChapterList;
