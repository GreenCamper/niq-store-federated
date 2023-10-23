import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProductBarChart from './ProductBarChart'
import ProductTable from './ProductTable'

const CategoryRenderer: React.FC = () => {
  return (
    <Box>
      <ProductBarChart />
      <ProductTable />
    </Box>
  )
}

export default CategoryRenderer
