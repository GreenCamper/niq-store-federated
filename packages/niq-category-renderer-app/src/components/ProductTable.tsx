import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  getProductsByCategory,
  useFetchContext,
  useSelection,
} from 'niq-store-shared-lib'

const ProductTable = () => {
  const { products } = useFetchContext()
  const { selectedCategory } = useSelection()
  const productData = getProductsByCategory(products, selectedCategory ?? '')

  return (
    <TableContainer component={Paper}>
      <Table aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell align="right">{product.rating.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
