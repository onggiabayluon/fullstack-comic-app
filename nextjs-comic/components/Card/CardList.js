function CardList({ items, className, CardComp }) {
  return items?.length > 0 ? (
    <ul className={className}>
      {items.map((item, index) => (
        <CardComp key={item.slug || item.id} index={index} {...item} />
      ))}
    </ul>
  ) : null
}

export default CardList
