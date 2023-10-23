import Category from './Category'

export default interface Product {
  id: string
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: Rating
}

interface Rating {
  rate: number
  count: number
}
