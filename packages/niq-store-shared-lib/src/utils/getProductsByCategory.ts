import Product from '../interfaces/Product'

export const getProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => {
  return products.filter((product) => product.category === category)
}
