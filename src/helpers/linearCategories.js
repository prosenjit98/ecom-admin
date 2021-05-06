const createCategoryList = (categories, options = []) => {
  categories.map(category => {
    options.push({ name: category.name, value: category._id, parentId: category.parentId, type: category.type })
    if (category.children.length > 0) {
      createCategoryList(category.children, options)
    }
  })
  return options
}

export default createCategoryList