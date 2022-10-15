function CardList({ items, className, CardComp, limit }) {
  return items?.length > 0 ? (
    <ul className={className}>
      {items.slice(0, limit).map((item, index) => (
        <CardComp key={item.slug || item.id} index={index} {...item} />
      ))}
    </ul>
  ) : null
}

export default CardList
