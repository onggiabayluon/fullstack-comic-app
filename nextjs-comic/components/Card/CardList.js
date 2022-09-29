function CardList({ items, className, CardComp }) {
  return items?.length > 0 ? (
    <ul className={className}>
      {items.map((item) => (
        <CardComp key={item.slug || item.id} {...item} />
      ))}
    </ul>
  ) : null
}

export default CardList
