import * as React from 'react'
import NIQContainer from './components/Container'
import { FetchProvider, SelectionProvider } from 'niq-store-shared-lib'

const LeftNav = React.lazy(() => import('LeftNavApp/LeftNav'))
const CategoryRenderer = React.lazy(
  () => import('CategoryRendererApp/CategoryRenderer'),
)
const ProductDetails = React.lazy(
  () => import('ProductDetailsApp/ProductDetails'),
)

const App: React.FC = (): React.ReactElement => {
  return (
    <FetchProvider url="https://fakestoreapi.com">
      <SelectionProvider>
        <NIQContainer
          LeftNav={LeftNav}
          CategoryRenderer={CategoryRenderer}
          ProductDetails={ProductDetails}
        />
      </SelectionProvider>
    </FetchProvider>
  )
}

export default App
