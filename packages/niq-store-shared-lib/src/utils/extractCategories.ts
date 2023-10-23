import Category from '../interfaces/Category'
import Product from '../interfaces/Product'

export const extractCategories = (products: Product[]): string[] => {
  const categoriesSet = new Set<string>() // Use a Set to store unique categories

  // Extract unique categories from the products array
  products.forEach((product) => {
    categoriesSet.add(product.category)
  })

  // Convert the Set back to an array of Category objects
  const uniqueCategories = [...categoriesSet].map((category) => category)

  return uniqueCategories
}
