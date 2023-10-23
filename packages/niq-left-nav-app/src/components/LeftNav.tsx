import * as React from 'react'
import GenericSelect from './GenericSelect'
import { GenericSelectType } from '../interfaces/GenericSelectProps'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  margin-top: 16px;
`

const StyledGenericSelect = styled(GenericSelect)`
  margin-bottom: 16px; // Added space between the selects
  width: 100%; // To ensure it takes the full width
`

const LeftNav: React.FC = () => {
  return (
    <ContainerBox>
      <StyledGenericSelect type={GenericSelectType.CATEGORY_SELECT} />
      <StyledGenericSelect type={GenericSelectType.PRODUCT_SELECT} />
    </ContainerBox>
  )
}

export default LeftNav
