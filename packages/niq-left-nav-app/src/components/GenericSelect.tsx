import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import * as React from 'react'
import {
  GenericSelectProps,
  GenericSelectType,
} from '../interfaces/GenericSelectProps'
import {
  useFetchContext,
  useSelection,
  extractCategories,
  getProductsByCategory,
} from 'niq-store-shared-lib'

import { styled } from '@mui/material/styles'

const StyledGenericSelect = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  margin-right: 8px;
  flex-grow: 1; // Make it take the available space
`
const StyledCloseButton = styled(Button)`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  &:hover {
    background-color: #0056b3;
  }
  height: 52px;
  margin-left: 12px;
`
const StyledInputLabel = styled(InputLabel)`
  transform: translate(0, -20px) scale(1); // Adjust the second value as necessary
`
const GenericSelect: React.FC<GenericSelectProps> = ({ type }) => {
  const {
    setSelectedCategory,
    setSelectedProduct,
    selectedProduct,
    selectedCategory,
    clearCategorySelection,
    clearProductsSelection,
  } = useSelection()
  const { products } = useFetchContext()

  const handleChange = (event: any) => {
    if (type === GenericSelectType.CATEGORY_SELECT) {
      setSelectedCategory(event.target.value as string)
    } else {
      if (type === GenericSelectType.PRODUCT_SELECT) {
        setSelectedProduct(event.target.value as string)
      }
    }
  }

  const handleClearValues = (type: GenericSelectType) => {
    if (type === GenericSelectType.CATEGORY_SELECT) {
      return clearCategorySelection()
    }
    return clearProductsSelection()
  }
  const values = (type: GenericSelectType) => {
    if (type === GenericSelectType.CATEGORY_SELECT) {
      return extractCategories(products)
    }
    return getProductsByCategory(products, selectedCategory ?? '').map(
      (product) => product.title,
    )
  }
  return (
    <StyledGenericSelect>
      <FormControl fullWidth>
        <StyledInputLabel id="generic-select-label">{type}</StyledInputLabel>
        <Select
          labelId="generic-select-label"
          id="generic-select"
          value={
            type === GenericSelectType.CATEGORY_SELECT
              ? selectedCategory
              : selectedProduct
          }
          onChange={handleChange}
        >
          {values(type).map((value, index) => (
            <MenuItem key={index} value={`${value}`}>
              {`${value}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StyledCloseButton onClick={() => handleClearValues(type)}>
        <CloseIcon fontSize="small" />
      </StyledCloseButton>
    </StyledGenericSelect>
  )
}

export default GenericSelect
