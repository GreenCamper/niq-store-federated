import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CategoryRenderer from './components/CategoryRenderer'

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CategoryRendererApp
        </Typography>
        <CategoryRenderer />
      </Box>
    </Container>
  )
}

export default App
