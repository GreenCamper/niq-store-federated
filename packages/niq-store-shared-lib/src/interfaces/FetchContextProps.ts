import Product from './Product'

export default interface FetchContextProps {
  products: Product[] // Replace 'any' with the actual data type you expect
  loading: boolean
  error: Error | undefined // Replace 'any' with the actual error type you expect, if applicable
}
