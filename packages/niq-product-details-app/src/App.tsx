import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProductDetails from './components/ProductDetails'
// import { styled } from "@mui/material/styles";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ProductDetailsApp
        </Typography>
        <ProductDetails />
      </Box>
    </Container>
  )
}

export default App
