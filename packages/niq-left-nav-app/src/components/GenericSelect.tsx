import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from '@mui/material'
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledSelect = styled(Select)`
  max-width: 100%;
  & .MuiSelect-select {
    padding-right: 25px; // Adjust this value as needed
  }
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
  transform: translate(0, -20px) scale(1);
`
const GenericSelect: React.FC<GenericSelectProps> = ({
  type,
}): React.ReactElement => {
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
    const value = event.target.value as string
    if (type === GenericSelectType.CATEGORY_SELECT) {
      if (selectedProduct) {
        clearProductsSelection()
      }
      setSelectedCategory(value)
    } else if (type === GenericSelectType.PRODUCT_SELECT) {
      setSelectedProduct(value)
    }
  }

  const handleClearValues = (type: GenericSelectType) => {
    if (type === GenericSelectType.CATEGORY_SELECT) {
      return clearCategorySelection()
    }
    return clearProductsSelection()
  }
  const getSelectOptions = (type: GenericSelectType) => {
    if (type === GenericSelectType.CATEGORY_SELECT) {
      return extractCategories(products)
    }
    return getProductsByCategory(products, selectedCategory ?? '').map(
      (product) => product.title,
    )
  }

  const selectedValue = (type: GenericSelectType) => {
    return type === GenericSelectType.CATEGORY_SELECT
      ? selectedCategory
      : selectedProduct
  }

  const setStatus = (type: GenericSelectType) => {
    if (type === GenericSelectType.PRODUCT_SELECT) {
      return selectedCategory ? false : true
    }
  }
  return (
    <StyledGenericSelect>
      <FormControl fullWidth>
        <StyledInputLabel id="generic-select-label">{type}</StyledInputLabel>
        <StyledSelect
          disabled={setStatus(type)}
          labelId="generic-select-label"
          id="generic-select"
          value={selectedValue(type)}
          onChange={handleChange}
          renderValue={(selected) => (
            <TruncatedTypography noWrap>{String(selected)}</TruncatedTypography>
          )}
        >
          {getSelectOptions(type).map((value, index) => (
            <MenuItem key={index} value={String(value)}>
              {String(value)}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
      <StyledCloseButton onClick={() => handleClearValues(type)}>
        <CloseIcon fontSize="small" />
      </StyledCloseButton>
    </StyledGenericSelect>
  )
}

export default GenericSelect
