import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const CategoryRenderer: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box> Graphic </Box>

        <Box> table </Box>
      </Box>
    </Container>
  )
}

export default CategoryRenderer
