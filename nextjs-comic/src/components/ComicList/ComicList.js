function ComicList({ comics, limit, hasBorder, Component, ...passProps }) {
  return comics
    ? comics.slice(0, limit).map((comic, index) => (
        <Component
          key={comic.id}
          comic={comic}
          {...passProps}
          {...(hasBorder && {
            ...((index == 0 || index == 1) && { borderTop: true }),
          })}
        />
      ))
    : null;
}

export default ComicList;
