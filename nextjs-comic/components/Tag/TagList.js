import Tag from './Tag'

function TagList({ tags, className, limit = 4 }) {
  return tags?.length > 0 ? (
    <ul className={className}>
      {tags.slice(0, limit).map((tag, index) => (
        <Tag key={tag.slug || tag.id} text={tag.name} {...tag} />
      ))}
    </ul>
  ) : null
}

export default TagList
