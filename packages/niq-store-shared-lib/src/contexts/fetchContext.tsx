import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import useFetch, { FetchProviderProps } from 'use-http'
import FetchContextProps from '../interfaces/FetchContextProps'
import Product from '../interfaces/Product'

const FetchContext = createContext<FetchContextProps | undefined>(undefined)

export const FetchProvider: React.FC<FetchProviderProps> = ({
  children,
  url,
}) => {
  const { get, response, loading, error } = useFetch(url)
  const [products, setProducts] = useState<Array<Product>>([])
  const [storeIsFull, setStoreIsFull] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    console.log('calling fetch data now')
    const res = await get('/products')
    if (response.ok) {
      setProducts(res)
      setStoreIsFull(true)
    }
  }, [url, get, response.ok])

  useEffect(() => {
    console.log(' fetch Context products', products)
    if (url && !storeIsFull) fetchData()
  }, [url, get, fetchData, response.ok])

  const value = {
    products,
    loading,
    error,
  }

  return <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
}

export const useFetchContext = (): FetchContextProps => {
  const context = useContext(FetchContext)
  if (context === undefined) {
    throw new Error('useFetchContext must be used within a FetchProvider')
  }
  return context
}
