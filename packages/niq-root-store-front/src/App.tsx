import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NIQContainer from './components/Container'

const LeftNav = React.lazy(() => import('LeftNavApp/LeftNav'))
const CategoryRenderer = React.lazy(
  () => import('CategoryRendererApp/CategoryRenderer'),
)
const ProductDetails = React.lazy(
  () => import('ProductDetailsApp/ProductDetails'),
)

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          RootApp
        </Typography>
        <NIQContainer
          LeftNav={LeftNav}
          CategoryRenderer={CategoryRenderer}
          ProductDetails={ProductDetails}
        />
      </Box>
    </Container>
  )
}

export default App
