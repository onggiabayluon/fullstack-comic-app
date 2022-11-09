import kebabCase from '@/lib/utils/kebabCase'

function categoriesToJSON(categories) {
  let isArray = Array.isArray(categories)
  if (!isArray) categories = [categories]
  categories = categories.map((category) => {
    return {
      ...category,
      name: kebabCase(category.name),
    }
  })

  return isArray ? categories : categories.pop()
}

export default categoriesToJSON
