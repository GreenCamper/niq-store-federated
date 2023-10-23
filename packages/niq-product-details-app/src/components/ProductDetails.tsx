import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import styled from 'styled-components'
import { useFetchContext, useSelection } from 'niq-store-shared-lib'
import Product from 'niq-store-shared-lib/src/interfaces/Product'

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const StyledCardContent = styled(CardContent)`
  flex: 1;
`

const ProductImage = styled.img`
  width: 200px;
  height: 200;
  margin-right: 16px;
  margin-left: 50px; // Adjust as needed
`

const StyledTitle = styled(Typography)`
  font-weight: bold;
  flex-grow: 1;
`

const StyledPrice = styled(Typography)`
  font-weight: bold;
  size: 50px;
`

const StyledBox = styled(Box)`
  display: flex;
`

const StyledTextBox = styled(Box)`
  display: flex;
  flex-direction: column;
`

const ProductDetails: React.FC = () => {
  const { selectedProduct } = useSelection()
  const { products } = useFetchContext()

  const selectedProductData = products.find(
    (product: Product) => product.title === selectedProduct,
  )
  if (!selectedProductData) return null

  const { title, category, id, price, description, image } = selectedProductData

  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        <StyledTitle variant="h5" gutterBottom>
          {title}
        </StyledTitle>
        <StyledBox>
          <StyledTextBox>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {category.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              SKU: {id}
            </Typography>
            <StyledPrice variant="h6" gutterBottom>
              ${price}
            </StyledPrice>
          </StyledTextBox>

          {image && <ProductImage src={image} alt={title} />}
        </StyledBox>

        <Box mt={2}>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </StyledCardContent>
    </StyledCard>
  )
}

export default ProductDetails
